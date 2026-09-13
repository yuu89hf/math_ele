/**
 * Division Engine & Visualizer Module (Standalone Plain JS)
 * Handles porogapit step-by-step logic, animations, hints, and interactive board.
 */

class DivisionEngine {
    constructor(dividend = 24, divisor = 2) {
        this.reset(dividend, divisor);
    }

    reset(dividend, divisor) {
        this.dividend = parseInt(dividend, 10);
        this.divisor = parseInt(divisor, 10);
        this.currentRemainder = this.dividend;
        this.steps = [];
        this.quotientParts = [];
        this.isFinished = false;
    }

    executeStep(multiplier) {
        multiplier = parseInt(multiplier, 10);

        if (isNaN(multiplier) || multiplier <= 0) {
            return {
                success: false,
                message: 'Pengali harus berupa angka bulat positif lebih dari 0!'
            };
        }

        const product = this.divisor * multiplier;

        if (product > this.currentRemainder) {
            return {
                success: false,
                message: `Hasil ${this.divisor} × ${multiplier} = ${product} melebihi sisa saat ini (${this.currentRemainder})!`
            };
        }

        const oldRemainder = this.currentRemainder;
        const newRemainder = oldRemainder - product;

        this.quotientParts.push(multiplier);
        this.currentRemainder = newRemainder;

        const stepObj = {
            stepIndex: this.steps.length + 1,
            multiplier,
            product,
            oldRemainder,
            newRemainder,
            explanation: `Perkalian: ${this.divisor} × ${multiplier} = ${product}. Pengurangan: ${oldRemainder} − ${product} = ${newRemainder}`
        };

        this.steps.push(stepObj);

        if (this.currentRemainder === 0) {
            this.isFinished = true;
        }

        return {
            success: true,
            step: stepObj,
            isFinished: this.isFinished,
            totalQuotient: this.getTotalQuotient()
        };
    }

    getTotalQuotient() {
        return this.quotientParts.reduce((acc, val) => acc + val, 0);
    }

    getHint() {
        if (this.isFinished) return 'Pembagian sudah selesai!';

        let rem = this.currentRemainder;
        let div = this.divisor;

        let placePower = 1;
        while (div * placePower * 10 <= rem) {
            placePower *= 10;
        }

        let suggestedMultiplier = 1;
        for (let d = 9; d >= 1; d--) {
            if (div * (d * placePower) <= rem) {
                suggestedMultiplier = d * placePower;
                break;
            }
        }

        return `Coba gunakan pengali ${suggestedMultiplier} (${div} × ${suggestedMultiplier} = ${div * suggestedMultiplier}).`;
    }
}

class DivisionVisualizer {
    constructor() {
        this.boardDivisor = document.getElementById('boardDivisor');
        this.boardDividend = document.getElementById('boardDividend');
        this.quotientDigitsWrapper = document.getElementById('quotientDigitsWrapper');
        this.verticalStepsContainer = document.getElementById('verticalStepsContainer');
        this.explanationList = document.getElementById('explanationList');
        this.victoryOverlay = document.getElementById('victoryOverlay');
        this.summaryEq = document.getElementById('summaryEq');
    }

    initBoard(dividend, divisor) {
        if (!this.boardDivisor) return;
        this.boardDivisor.textContent = divisor;
        this.boardDividend.textContent = dividend;
        
        if (this.quotientDigitsWrapper) {
            this.quotientDigitsWrapper.innerHTML = `<span class="q-placeholder text-slate-400 font-bold">?</span>`;
        }
        if (this.verticalStepsContainer) {
            this.verticalStepsContainer.innerHTML = '';
        }
        if (this.explanationList) {
            this.explanationList.innerHTML = `
                <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-xs border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    Mulai pembagian: <strong class="text-indigo-600 dark:text-indigo-400 font-mono">${dividend} ÷ ${divisor}</strong>.
                </div>
            `;
        }
        
        this.hideVictory();
    }

    renderQuotientParts(quotientParts, isFinished = false) {
        if (!this.quotientDigitsWrapper) return;
        if (quotientParts.length === 0) {
            this.quotientDigitsWrapper.innerHTML = `<span class="text-slate-400">?</span>`;
            return;
        }

        let html = '';
        let total = 0;

        quotientParts.forEach((part, index) => {
            total += part;
            html += `<span class="px-2 py-0.5 bg-emerald-500/15 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-md animate-quotient-drop inline-block text-xs sm:text-sm shrink-0">${part}</span>`;
            if (index < quotientParts.length - 1) {
                html += `<span class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold shrink-0">+</span>`;
            }
        });

        if (isFinished) {
            html += ` <span class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold shrink-0">=</span> <span class="text-purple-600 dark:text-purple-400 text-base sm:text-lg font-extrabold border-b-2 border-purple-600 dark:border-purple-400 animate-total-pop inline-block shrink-0">${total}</span>`;
        }
        this.quotientDigitsWrapper.innerHTML = html;
    }

    renderStepRow(step, isLast = false) {
        if (!this.verticalStepsContainer) return;
        const rowBlock = document.createElement('div');
        rowBlock.className = 'flex flex-col items-end w-full mb-1.5 animate-step-row';
        rowBlock.id = `step-row-${step.stepIndex}`;

        const productDiv = document.createElement('div');
        productDiv.className = 'font-mono text-3xl sm:text-4xl font-bold tracking-[0.08em] text-purple-600 dark:text-purple-400 text-right leading-none animate-product-glow';
        productDiv.textContent = step.product;

        const lineRow = document.createElement('div');
        lineRow.className = 'relative w-full flex items-center justify-end my-1 overflow-visible';
        lineRow.innerHTML = `
            <div class="h-[2.5px] bg-slate-500 dark:bg-slate-400 w-full rounded-sm origin-right animate-draw-line"></div>
            <span class="absolute -right-5 sm:-right-6 text-xl sm:text-2xl font-bold text-rose-500 animate-pop-minus">−</span>
        `;

        const remainderDiv = document.createElement('div');
        const isFinalZero = isLast && step.newRemainder === 0;
        remainderDiv.className = `font-mono text-3xl sm:text-4xl font-bold tracking-[0.08em] text-emerald-600 dark:text-emerald-400 text-right leading-none ${isFinalZero ? 'text-emerald-600 dark:text-emerald-500 text-3xl sm:text-4xl animate-final-zero' : 'animate-pop-remainder'}`;
        remainderDiv.textContent = step.newRemainder;

        rowBlock.appendChild(productDiv);
        rowBlock.appendChild(lineRow);
        rowBlock.appendChild(remainderDiv);

        this.verticalStepsContainer.appendChild(rowBlock);
        rowBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    addExplanation(stepObj) {
        if (!this.explanationList) return;
        const expItem = document.createElement('div');
        expItem.className = 'p-2 bg-white dark:bg-slate-900 rounded-lg text-xs border border-slate-200 dark:border-slate-800 flex flex-col gap-0.5';
        expItem.innerHTML = `
            <div class="font-bold text-indigo-600 dark:text-indigo-400">Langkah ${stepObj.stepIndex}: <span class="text-slate-700 dark:text-slate-200">Pengali <code class="px-1.5 py-0.2 bg-indigo-100 dark:bg-indigo-900/50 rounded font-mono font-bold text-indigo-600 dark:text-indigo-400">${stepObj.multiplier}</code></span></div>
            <div class="text-slate-600 dark:text-slate-300">• ${this.boardDivisor.textContent} × ${stepObj.multiplier} = <strong class="text-purple-600 dark:text-purple-400">${stepObj.product}</strong></div>
            <div class="text-slate-600 dark:text-slate-300">• Sisa: ${stepObj.oldRemainder} − ${stepObj.product} = <strong class="text-emerald-600 dark:text-emerald-400">${stepObj.newRemainder}</strong></div>
        `;
        this.explanationList.appendChild(expItem);
        expItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    showVictory(dividend, divisor, quotient) {
        if (!this.victoryOverlay) this.victoryOverlay = document.getElementById('victoryOverlay');
        if (!this.summaryEq) this.summaryEq = document.getElementById('summaryEq');

        if (!this.victoryOverlay) return;

        if (this.summaryEq) {
            this.summaryEq.textContent = `${dividend} ÷ ${divisor} = ${quotient}`;
        }

        this.victoryOverlay.classList.remove('hidden', 'pointer-events-none');
        this.victoryOverlay.classList.add('pointer-events-auto');

        if (typeof window.confetti === 'function') {
            try {
                window.confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } catch (e) {}
        }
    }

    hideVictory() {
        if (this.victoryOverlay) {
            this.victoryOverlay.classList.add('hidden', 'pointer-events-none');
            this.victoryOverlay.classList.remove('pointer-events-auto');
        }
    }
}

function initPembagianApp() {
    if (typeof window.lucide !== 'undefined') {
        window.lucide.createIcons();
    }

    const divisionForm = document.getElementById('divisionForm');
    const dividendInput = document.getElementById('dividendInput');
    const divisorInput = document.getElementById('divisorInput');
    
    if (!divisionForm || !dividendInput || !divisorInput) return; // Not on Pembagian page

    const engine = new DivisionEngine(24, 2);
    const visualizer = new DivisionVisualizer();

    const interactiveStepBox = document.getElementById('interactiveStepBox');
    const stepCounterBadge = document.getElementById('stepCounterBadge');
    const currentDivisorText = document.getElementById('currentDivisorText');
    const currentRemainderText = document.getElementById('currentRemainderText');
    const formulaDivisor = document.getElementById('formulaDivisor');
    const userMultiplierInput = document.getElementById('userMultiplierInput');
    const multiplierResultPreview = document.getElementById('multiplierResultPreview');
    const userSubResult = document.getElementById('userSubResult');
    const submitStepBtn = document.getElementById('submitStepBtn');
    const hintBtn = document.getElementById('hintBtn');
    const stepFeedback = document.getElementById('stepFeedback');

    const randomBtn = document.getElementById('randomBtn');

    const invalidDivisionWarning = document.getElementById('invalidDivisionWarning');
    const warningCalcText = document.getElementById('warningCalcText');
    const fixNumberBtn = document.getElementById('fixNumberBtn');
    const suggestedCleanText = document.getElementById('suggestedCleanText');

    const closeVictoryBtn = document.getElementById('closeVictoryBtn');

    const panelControlSection = document.getElementById('panelControlSection');
    const panelPaperSection = document.getElementById('panelPaperSection');
    const mobileTabControl = document.getElementById('mobileTabControl');
    const mobileTabPaper = document.getElementById('mobileTabPaper');
    const rightViewSwitcherBtn = document.getElementById('rightViewSwitcherBtn');
    const rightViewText = document.getElementById('rightViewText');

    let activeMobileTab = 'control';

    function setMobileView(view) {
        activeMobileTab = view;
        const isMobile = window.innerWidth < 1024;

        if (!isMobile) {
            if (panelControlSection) panelControlSection.classList.remove('hidden');
            if (panelPaperSection) panelPaperSection.classList.remove('hidden');
            return;
        }

        if (view === 'control') {
            if (panelControlSection) panelControlSection.classList.remove('hidden');
            if (panelPaperSection) panelPaperSection.classList.add('hidden');
            
            if (mobileTabControl) mobileTabControl.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (mobileTabPaper) mobileTabPaper.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (rightViewText) rightViewText.textContent = "Papan";
        } else {
            if (panelControlSection) panelControlSection.classList.add('hidden');
            if (panelPaperSection) panelPaperSection.classList.remove('hidden');
            
            if (mobileTabPaper) mobileTabPaper.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (mobileTabControl) mobileTabControl.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (rightViewText) rightViewText.textContent = "Kontrol";
        }
    }

    function checkCleanDivision(dividend, divisor) {
        if (divisor <= 0) return true;
        return dividend % divisor === 0;
    }

    function updateWarningState() {
        const dividend = parseInt(dividendInput.value, 10) || 0;
        const divisor = parseInt(divisorInput.value, 10) || 1;

        if (dividend > 0 && divisor > 0 && !checkCleanDivision(dividend, divisor)) {
            const cleanDividend = Math.floor(dividend / divisor) * divisor;
            const targetClean = cleanDividend > 0 ? cleanDividend : divisor;
            
            if (warningCalcText) warningCalcText.textContent = `${dividend} ÷ ${divisor} = ${(dividend / divisor).toFixed(1)}`;
            if (suggestedCleanText) suggestedCleanText.textContent = targetClean;
            if (invalidDivisionWarning) invalidDivisionWarning.classList.remove('hidden');
        } else {
            if (invalidDivisionWarning) invalidDivisionWarning.classList.add('hidden');
        }
    }

    function initProblem() {
        let dividend = parseInt(dividendInput.value, 10);
        let divisor = parseInt(divisorInput.value, 10);

        if (isNaN(dividend) || dividend < 1) dividend = 24;
        if (isNaN(divisor) || divisor < 1) divisor = 2;

        updateWarningState();

        engine.reset(dividend, divisor);
        visualizer.initBoard(dividend, divisor);
        updateInteractiveBox();
    }

    function updateInteractiveBox() {
        if (!interactiveStepBox) return;

        if (engine.isFinished) {
            interactiveStepBox.classList.add('hidden');
            return;
        }

        interactiveStepBox.classList.remove('hidden');

        if (stepCounterBadge) stepCounterBadge.textContent = `Langkah ${engine.steps.length + 1}`;
        if (currentDivisorText) currentDivisorText.textContent = engine.divisor;
        if (currentRemainderText) currentRemainderText.textContent = engine.currentRemainder;
        if (formulaDivisor) formulaDivisor.textContent = engine.divisor;

        if (userMultiplierInput) {
            userMultiplierInput.value = '';
        }
        if (multiplierResultPreview) multiplierResultPreview.textContent = '?';
        if (userSubResult) userSubResult.textContent = '0';
        if (stepFeedback) stepFeedback.textContent = '';
    }

    function handleMultiplierInput() {
        const val = parseInt(userMultiplierInput.value, 10);
        if (isNaN(val) || val <= 0) {
            if (multiplierResultPreview) multiplierResultPreview.textContent = '?';
            if (userSubResult) userSubResult.textContent = '0';
            return;
        }
        const product = engine.divisor * val;
        if (multiplierResultPreview) multiplierResultPreview.textContent = product;
        if (userSubResult) userSubResult.textContent = product;
    }

    function submitStep() {
        if (window.soundFx) window.soundFx.playClick();
        const multiplier = parseInt(userMultiplierInput.value, 10);
        const res = engine.executeStep(multiplier);

        if (!res.success) {
            if (window.soundFx) window.soundFx.playError();
            if (stepFeedback) {
                stepFeedback.className = 'text-[11px] font-semibold text-rose-600 dark:text-rose-400 min-h-[16px]';
                stepFeedback.textContent = res.message;
            }
            return;
        }

        if (window.soundFx) window.soundFx.playStepSuccess();
        visualizer.renderQuotientParts(engine.quotientParts, res.isFinished);
        visualizer.renderStepRow(res.step, res.isFinished);
        visualizer.addExplanation(res.step);

        setMobileView('paper');

        if (res.isFinished) {
            if (window.soundFx) window.soundFx.playVictory();
            visualizer.showVictory(engine.dividend, engine.divisor, res.totalQuotient);
        }

        updateInteractiveBox();
    }

    // Event Listeners
    if (dividendInput) dividendInput.addEventListener('input', initProblem);
    if (divisorInput) divisorInput.addEventListener('input', initProblem);

    if (userMultiplierInput) {
        userMultiplierInput.addEventListener('input', handleMultiplierInput);
        userMultiplierInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') submitStep();
        });
    }

    if (submitStepBtn) submitStepBtn.addEventListener('click', submitStep);

    if (hintBtn) {
        hintBtn.addEventListener('click', () => {
            if (window.soundFx) window.soundFx.playClick();
            const hintMsg = engine.getHint();
            if (stepFeedback) {
                stepFeedback.className = 'text-[11px] font-semibold text-amber-600 dark:text-amber-400 min-h-[16px]';
                stepFeedback.textContent = `💡 ${hintMsg}`;
            }
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            if (window.soundFx) window.soundFx.playClick();
            const divisors = [2, 3, 4, 5, 6, 7, 8, 9];
            const div = divisors[Math.floor(Math.random() * divisors.length)];
            const mult = Math.floor(Math.random() * 45) + 5;
            const newDividend = div * mult;

            if (dividendInput) dividendInput.value = newDividend;
            if (divisorInput) divisorInput.value = div;

            initProblem();
        });
    }

    if (fixNumberBtn) {
        fixNumberBtn.addEventListener('click', () => {
            if (window.soundFx) window.soundFx.playClick();
            const dividend = parseInt(dividendInput.value, 10) || 0;
            const divisor = parseInt(divisorInput.value, 10) || 1;
            const cleanDividend = Math.floor(dividend / divisor) * divisor;

            if (dividendInput) dividendInput.value = cleanDividend > 0 ? cleanDividend : divisor;
            initProblem();
        });
    }

    if (closeVictoryBtn) {
        closeVictoryBtn.addEventListener('click', () => {
            if (window.soundFx) window.soundFx.playClick();
            visualizer.hideVictory();
        });
    }

    // Mobile Navigation & View Switching
    if (mobileTabControl && mobileTabPaper) {
        mobileTabControl.addEventListener('click', () => setMobileView('control'));
        mobileTabPaper.addEventListener('click', () => setMobileView('paper'));
    }

    if (rightViewSwitcherBtn) {
        rightViewSwitcherBtn.addEventListener('click', () => {
            if (window.soundFx) window.soundFx.playClick();
            setMobileView(activeMobileTab === 'control' ? 'paper' : 'control');
        });
    }

    window.addEventListener('resize', () => {
        setMobileView(activeMobileTab);
    });

    setMobileView('control');
    initProblem();
}

document.addEventListener('DOMContentLoaded', initPembagianApp);
