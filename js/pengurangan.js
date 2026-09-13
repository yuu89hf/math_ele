/**
 * Subtraction Engine & Visualizer Module (Standalone Plain JS)
 * Step-by-step vertical subtraction with borrowing/regrouping logic.
 */

class SubtractionEngine {
    constructor(minuend = 27, subtrahend = 9) {
        this.reset(minuend, subtrahend);
    }

    reset(minuend, subtrahend) {
        this.minuend = Math.max(1, Math.abs(parseInt(minuend, 10) || 0));
        this.subtrahend = Math.max(0, Math.abs(parseInt(subtrahend, 10) || 0));

        if (this.minuend < this.subtrahend) {
            let temp = this.minuend;
            this.minuend = this.subtrahend;
            this.subtrahend = temp;
        }

        this.topDigits = String(this.minuend).split('').map(Number).reverse();
        this.botDigits = String(this.subtrahend).split('').map(Number).reverse();

        while (this.botDigits.length < this.topDigits.length) {
            this.botDigits.push(0);
        }

        this.currentTop = [...this.topDigits];
        this.currentBot = [...this.botDigits];
        
        this.borrowStates = new Array(this.topDigits.length).fill(null);
        this.resultDigits = new Array(this.topDigits.length).fill(null);

        this.isFinished = false;
        this.steps = [];

        this.generateStepSequence();
        this.stepPointer = 0;
    }

    generateStepSequence() {
        this.stepSequence = [];
        let workingTop = [...this.topDigits];

        for (let col = 0; col < workingTop.length; col++) {
            let topVal = workingTop[col];
            let botVal = this.botDigits[col];

            // If top < bot, borrow step
            if (topVal < botVal) {
                let borrowCol = col + 1;
                while (borrowCol < workingTop.length && workingTop[borrowCol] === 0) {
                    borrowCol++;
                }

                if (borrowCol < workingTop.length) {
                    for (let c = borrowCol; c > col; c--) {
                        let donorOrig = workingTop[c];
                        workingTop[c] -= 1;
                        let donorNew = workingTop[c];
                        
                        let recipientOrig = workingTop[c - 1];
                        workingTop[c - 1] += 10;
                        let recipientNew = workingTop[c - 1];

                        this.stepSequence.push({
                            type: 'borrow',
                            col: c - 1,
                            donorCol: c,
                            donorOrig,
                            donorNew,
                            recipientCol: c - 1,
                            recipientOrig,
                            recipientNew,
                            message: `Pinjam 1 puluhan dari kolom ${this.getColName(c)}: ${donorOrig} → ${donorNew}. Kolom ${this.getColName(c-1)}: ${recipientOrig} → ${recipientNew}!`
                        });
                    }
                }
                topVal = workingTop[col];
            }

            // Subtract step
            let diff = topVal - botVal;
            this.stepSequence.push({
                type: 'subtract',
                col,
                topVal,
                botVal,
                diff,
                message: `Hitung kolom ${this.getColName(col)}: ${topVal} - ${botVal} = ${diff}`
            });
        }
    }

    getColName(colIndex) {
        const names = ['Satuan', 'Puluhan', 'Ratusan', 'Ribuan'];
        return names[colIndex] || `Kolom ${colIndex + 1}`;
    }

    getCurrentStepInfo() {
        if (this.stepPointer >= this.stepSequence.length) {
            return null;
        }
        return this.stepSequence[this.stepPointer];
    }

    executeCurrentStep() {
        if (this.isFinished || this.stepPointer >= this.stepSequence.length) {
            return { success: false, message: 'Pengurangan sudah selesai!' };
        }

        const step = this.stepSequence[this.stepPointer];
        this.steps.push(step);

        if (step.type === 'borrow') {
            this.currentTop[step.donorCol] = step.donorNew;
            this.currentTop[step.recipientCol] = step.recipientNew;
            this.borrowStates[step.donorCol] = {
                blurred: true,
                origVal: step.donorOrig,
                newVal: step.donorNew
            };
            this.borrowStates[step.recipientCol] = {
                boosted: true,
                origVal: step.recipientOrig,
                newVal: step.recipientNew
            };
        } else if (step.type === 'subtract') {
            this.resultDigits[step.col] = step.diff;
        }

        this.stepPointer++;
        if (this.stepPointer >= this.stepSequence.length) {
            this.isFinished = true;
        }

        return {
            success: true,
            step,
            isFinished: this.isFinished,
            finalResult: this.isFinished ? this.minuend - this.subtrahend : null
        };
    }
}

class SubtractionVisualizer {
    constructor() {
        this.boardContainer = document.getElementById('subtractionBoardContainer');
        this.explanationContainer = document.getElementById('subExplanationList');
    }

    initBoard(engine) {
        if (!this.boardContainer) return;
        this.render(engine);

        if (this.explanationContainer) {
            this.explanationContainer.innerHTML = `
                <div class="p-3.5 bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-2xl text-xs text-indigo-900 dark:text-indigo-200 font-bold flex items-center gap-2 shadow-xs">
                    <i data-lucide="info" class="w-4 h-4 text-indigo-500 shrink-0"></i>
                    <span>Klik <strong>Langkah Berikutnya</strong> untuk memulai animasi meminjam & pengurangan bersusun.</span>
                </div>
            `;
            if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
        }
    }

    render(engine) {
        if (!this.boardContainer) return;

        const maxLen = engine.topDigits.length;

        let borrowRowHtml = '';
        for (let col = maxLen - 1; col >= 0; col--) {
            const bState = engine.borrowStates[col];
            if (bState && bState.blurred) {
                borrowRowHtml += `
                    <div class="w-10 h-8 sm:w-12 sm:h-10 flex items-center justify-center">
                        <span class="px-2 py-0.5 bg-rose-500 text-white font-mono font-black text-xs sm:text-sm rounded-lg shadow-sm border border-rose-400">
                            ${bState.newVal}
                        </span>
                    </div>
                `;
            } else if (bState && bState.boosted) {
                borrowRowHtml += `
                    <div class="w-10 h-8 sm:w-12 sm:h-10 flex items-center justify-center">
                        <span class="px-2 py-0.5 bg-emerald-500 text-white font-mono font-black text-xs sm:text-sm rounded-lg shadow-sm border border-emerald-400">
                            ${bState.newVal}
                        </span>
                    </div>
                `;
            } else {
                borrowRowHtml += `<div class="w-10 h-8 sm:w-12 sm:h-10"></div>`;
            }
        }

        let topRowHtml = '';
        for (let col = maxLen - 1; col >= 0; col--) {
            const bState = engine.borrowStates[col];
            const origDigit = engine.topDigits[col];

            if (bState && bState.blurred) {
                topRowHtml += `
                    <div class="w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center relative">
                        <span class="font-mono text-xl sm:text-2xl font-black text-rose-400 dark:text-rose-500 opacity-40 blur-[1.5px] scale-95 transition-all duration-500 select-none">
                            ${origDigit}
                        </span>
                    </div>
                `;
            } else if (bState && bState.boosted) {
                topRowHtml += `
                    <div class="w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center relative">
                        <span class="font-mono text-xl sm:text-2xl font-black text-emerald-400 dark:text-emerald-500 opacity-40 blur-[1.5px] scale-95 transition-all duration-500 select-none">
                            ${origDigit}
                        </span>
                    </div>
                `;
            } else {
                topRowHtml += `
                    <div class="w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center">
                        <span class="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                            ${origDigit}
                        </span>
                    </div>
                `;
            }
        }

        let botRowHtml = '';
        for (let col = maxLen - 1; col >= 0; col--) {
            const botDigit = engine.botDigits[col];
            botRowHtml += `
                <div class="w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center">
                    <span class="font-mono text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-300">
                        ${botDigit}
                    </span>
                </div>
            `;
        }

        let resultRowHtml = '';
        for (let col = maxLen - 1; col >= 0; col--) {
            const resVal = engine.resultDigits[col];
            if (resVal !== null) {
                resultRowHtml += `
                    <div class="w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/60 rounded-xl border-2 border-indigo-400 shadow-sm">
                        <span class="font-mono text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
                            ${resVal}
                        </span>
                    </div>
                `;
            } else {
                resultRowHtml += `
                    <div class="w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                        <span class="font-mono text-xl sm:text-2xl font-bold text-slate-300 dark:text-slate-700">?</span>
                    </div>
                `;
            }
        }

        this.boardContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center p-5 sm:p-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-md relative overflow-hidden my-2 bg-grid-pattern">
                
                <div class="w-full flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <div class="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                        <i data-lucide="notebook-pen" class="w-3.5 h-3.5"></i>
                        <span>Kertas Kerja Pengurangan Bersusun</span>
                    </div>
                    <span class="text-[10px] font-mono font-extrabold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        ${engine.minuend} - ${engine.subtrahend}
                    </span>
                </div>

                <div class="flex flex-col items-end gap-1 font-mono pt-2">
                    <div class="flex items-center gap-1">
                        ${borrowRowHtml}
                    </div>

                    <div class="flex items-center gap-1">
                        ${topRowHtml}
                    </div>

                    <div class="flex items-center gap-1 relative">
                        <span class="font-mono text-2xl sm:text-3xl font-black text-rose-500 absolute -left-8 sm:-left-10">-</span>
                        ${botRowHtml}
                    </div>

                    <div class="w-full h-1 bg-gradient-to-r from-rose-500 via-indigo-500 to-emerald-500 rounded-full my-1 shadow-xs"></div>

                    <div class="flex items-center gap-1 pt-1">
                        ${resultRowHtml}
                    </div>
                </div>

            </div>
        `;
        if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
    }

    addExplanation(step) {
        if (!this.explanationContainer) return;

        let badgeClass = step.type === 'borrow' ? 'bg-rose-500 text-white' : 'bg-indigo-600 text-white';
        let icon = step.type === 'borrow' ? 'git-commit' : 'minus-circle';

        let detailedLogic = '';
        if (step.type === 'borrow') {
            detailedLogic = `
                <div class="text-[11px] text-rose-700 dark:text-rose-300 pt-1 leading-normal font-semibold">
                    💡 <strong>Logika Meminjam:</strong> Karena angka atas lebih kecil dari bawah, pinjam 1 puluhan (+10). Kedua angka asal <strong>${step.donorOrig}</strong> dan <strong>${step.recipientOrig}</strong> mengecil & di-blur halus. Angka <strong>${step.donorOrig}</strong> berubah menjadi <strong>${step.donorNew}</strong>, dan angka <strong>${step.recipientOrig}</strong> berubah menjadi <strong>${step.recipientNew}</strong>!
                </div>
            `;
        } else {
            detailedLogic = `
                <div class="text-[11px] text-indigo-700 dark:text-indigo-300 pt-1 leading-normal font-semibold">
                    ✏️ <strong>Hasil Kolom:</strong> Pengurangan langsung pada kolom ${this.getColName(step.col)}: <strong>${step.topVal} - ${step.botVal} = ${step.diff}</strong>.
                </div>
            `;
        }

        const item = document.createElement('div');
        item.className = 'p-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col gap-1 shadow-xs animate-fadeIn';
        item.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 ${badgeClass} text-[10px] font-extrabold uppercase rounded-md flex items-center gap-1">
                    <i data-lucide="${icon}" class="w-3 h-3"></i>
                    ${step.type.toUpperCase()}
                </span>
                <span class="text-xs font-extrabold text-slate-800 dark:text-slate-200">${step.message}</span>
            </div>
            ${detailedLogic}
        `;

        this.explanationContainer.prepend(item);
        if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
    }

    getColName(colIndex) {
        const names = ['Satuan', 'Puluhan', 'Ratusan', 'Ribuan'];
        return names[colIndex] || `Kolom ${colIndex + 1}`;
    }
}

function initPenguranganApp() {
    if (typeof window.lucide !== 'undefined') {
        window.lucide.createIcons();
    }

    const minuendInput = document.getElementById('minuendInput');
    const subtrahendInput = document.getElementById('subtrahendInput');
    if (!minuendInput || !subtrahendInput) return; // Not on Pengurangan page

    const engine = new SubtractionEngine(27, 9);
    const visualizer = new SubtractionVisualizer();

    const randomBtn = document.getElementById('subRandomBtn');
    const nextStepBtn = document.getElementById('subNextStepBtn');
    const resetStepBtn = document.getElementById('subResetStepBtn');
    
    const canvasNextStepBtn = document.getElementById('subCanvasNextStepBtn');
    const canvasResetBtn = document.getElementById('subCanvasResetBtn');

    const currentStepText = document.getElementById('subCurrentStepText');

    const panelControlSection = document.getElementById('subControlSection');
    const panelCanvasSection = document.getElementById('subCanvasSection');
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
            if (panelCanvasSection) panelCanvasSection.classList.remove('hidden');
            return;
        }

        if (view === 'control') {
            if (panelControlSection) panelControlSection.classList.remove('hidden');
            if (panelCanvasSection) panelCanvasSection.classList.add('hidden');
            
            if (mobileTabControl) mobileTabControl.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (mobileTabPaper) mobileTabPaper.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (rightViewText) rightViewText.textContent = "Papan";
        } else {
            if (panelControlSection) panelControlSection.classList.add('hidden');
            if (panelCanvasSection) panelCanvasSection.classList.remove('hidden');
            
            if (mobileTabPaper) mobileTabPaper.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (mobileTabControl) mobileTabControl.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (rightViewText) rightViewText.textContent = "Kontrol";
        }
    }

    function initProblem() {
        let minuend = parseInt(minuendInput.value, 10);
        let subtrahend = parseInt(subtrahendInput.value, 10);

        if (isNaN(minuend) || minuend < 1) minuend = 27;
        if (isNaN(subtrahend) || subtrahend < 0) subtrahend = 9;

        if (minuend < subtrahend) {
            let temp = minuend;
            minuend = subtrahend;
            subtrahend = temp;
            minuendInput.value = minuend;
            subtrahendInput.value = subtrahend;
        }

        engine.reset(minuend, subtrahend);
        visualizer.initBoard(engine);
        updateStepGuide();
    }

    function updateStepGuide() {
        const currentStep = engine.getCurrentStepInfo();

        if (engine.isFinished) {
            if (currentStepText) currentStepText.innerHTML = `🎉 <strong>Selesai!</strong> Hasil akhir: <strong>${engine.minuend} - ${engine.subtrahend} = ${engine.minuend - engine.subtrahend}</strong>`;
            if (nextStepBtn) nextStepBtn.disabled = true;
            if (canvasNextStepBtn) canvasNextStepBtn.disabled = true;
            return;
        }

        if (nextStepBtn) nextStepBtn.disabled = false;
        if (canvasNextStepBtn) canvasNextStepBtn.disabled = false;

        if (currentStep && currentStepText) {
            if (currentStep.type === 'borrow') {
                currentStepText.innerHTML = `⚠️ <strong>Proses Meminjam:</strong> ${currentStep.message}`;
            } else {
                currentStepText.innerHTML = `✏️ <strong>Hitung Pengurangan:</strong> ${currentStep.message}`;
            }
        }
    }

    function executeNextStep() {
        if (window.soundFx) window.soundFx.playClick();
        const res = engine.executeCurrentStep();

        if (!res.success) {
            if (window.soundFx) window.soundFx.playError();
            return;
        }

        if (window.soundFx) window.soundFx.playStepSuccess();
        visualizer.render(engine);
        visualizer.addExplanation(res.step);

        setMobileView('paper');

        if (res.isFinished) {
            if (window.soundFx) window.soundFx.playVictory();
        }

        updateStepGuide();
    }

    // Control Panel Event Listeners
    if (minuendInput) minuendInput.addEventListener('input', initProblem);
    if (subtrahendInput) subtrahendInput.addEventListener('input', initProblem);

    if (nextStepBtn) nextStepBtn.addEventListener('click', executeNextStep);
    if (resetStepBtn) {
        resetStepBtn.addEventListener('click', () => {
            if (window.soundFx) window.soundFx.playClick();
            initProblem();
        });
    }

    // Canvas Event Listeners
    if (canvasNextStepBtn) canvasNextStepBtn.addEventListener('click', executeNextStep);
    if (canvasResetBtn) {
        canvasResetBtn.addEventListener('click', () => {
            if (window.soundFx) window.soundFx.playClick();
            initProblem();
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            if (window.soundFx) window.soundFx.playClick();
            const minuends = [27, 42, 53, 61, 74, 85, 93, 105, 124];
            const subtrahends = [9, 15, 28, 37, 46, 58, 69, 78, 89];
            
            const min = minuends[Math.floor(Math.random() * minuends.length)];
            const sub = subtrahends[Math.floor(Math.random() * subtrahends.length)];

            if (minuendInput) minuendInput.value = min;
            if (subtrahendInput) subtrahendInput.value = sub;

            initProblem();
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

document.addEventListener('DOMContentLoaded', initPenguranganApp);
