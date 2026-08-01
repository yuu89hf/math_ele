import { SoundEffects, BGMController } from './audio.js';
import { DivisionEngine } from './engine.js';
import { DivisionVisualizer } from './visualizer.js';

export function initMath2App() {
    if (typeof window.lucide !== 'undefined') {
        window.lucide.createIcons();
    }

    const soundFx = new SoundEffects();
    const bgmPlayer = new BGMController();
    const engine = new DivisionEngine(24, 2);
    const visualizer = new DivisionVisualizer();

    window.soundFx = soundFx;
    window.bgmPlayer = bgmPlayer;

    const divisionForm = document.getElementById('divisionForm');
    const dividendInput = document.getElementById('dividendInput');
    const divisorInput = document.getElementById('divisorInput');
    
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

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const bgmToggleBtn = document.getElementById('bgmToggleBtn');

    const closeVictoryBtn = document.getElementById('closeVictoryBtn');

    const panelControlSection = document.getElementById('panelControlSection');
    const panelPaperSection = document.getElementById('panelPaperSection');
    const mobileTabControl = document.getElementById('mobileTabControl');
    const mobileTabPaper = document.getElementById('mobileTabPaper');
    const rightViewSwitcherBtn = document.getElementById('rightViewSwitcherBtn');
    const rightViewText = document.getElementById('rightViewText');

    if (!divisionForm || !dividendInput || !divisorInput) {
        return; // Not on Pembagian page
    }

    let activeMobileTab = 'control'; // Starts at Kontrol & Soal on Mobile

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
        const rem = dividend % divisor;
        return rem === 0;
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
        soundFx.playClick();
        const multiplier = parseInt(userMultiplierInput.value, 10);
        const res = engine.executeStep(multiplier);

        if (!res.success) {
            soundFx.playError();
            if (stepFeedback) {
                stepFeedback.className = 'text-[11px] font-semibold text-rose-600 dark:text-rose-400 min-h-[16px]';
                stepFeedback.textContent = res.message;
            }
            return;
        }

        soundFx.playStepSuccess();
        visualizer.renderQuotientParts(engine.quotientParts, res.isFinished);
        visualizer.renderStepRow(res.step, res.isFinished);
        visualizer.addExplanation(res.step);

        // Auto transition to Papan Visual on mobile after clicking Kurangkan
        setMobileView('paper');

        if (res.isFinished) {
            soundFx.playVictory();
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
            soundFx.playClick();
            const hintMsg = engine.getHint();
            if (stepFeedback) {
                stepFeedback.className = 'text-[11px] font-semibold text-amber-600 dark:text-amber-400 min-h-[16px]';
                stepFeedback.textContent = `💡 ${hintMsg}`;
            }
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            soundFx.playClick();
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
            soundFx.playClick();
            const dividend = parseInt(dividendInput.value, 10) || 0;
            const divisor = parseInt(divisorInput.value, 10) || 1;
            const cleanDividend = Math.floor(dividend / divisor) * divisor;

            if (dividendInput) dividendInput.value = cleanDividend > 0 ? cleanDividend : divisor;
            initProblem();
        });
    }

    if (closeVictoryBtn) {
        closeVictoryBtn.addEventListener('click', () => {
            soundFx.playClick();
            visualizer.hideVictory();
        });
    }

    // Header Controls
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            soundFx.playClick();
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('math2_theme', isDark ? 'dark' : 'light');
        });
    }

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            const enabled = soundFx.toggleSound();
            soundToggleBtn.classList.toggle('opacity-50', !enabled);
        });
    }

    if (bgmToggleBtn) {
        bgmToggleBtn.addEventListener('click', () => {
            const isPlaying = bgmPlayer.toggleBGM();
            bgmToggleBtn.classList.toggle('text-indigo-600', isPlaying);
            bgmToggleBtn.classList.toggle('bg-indigo-100', isPlaying);
        });
    }

    // Mobile Navigation & View Switching
    if (mobileTabControl && mobileTabPaper) {
        mobileTabControl.addEventListener('click', () => setMobileView('control'));
        mobileTabPaper.addEventListener('click', () => setMobileView('paper'));
    }

    if (rightViewSwitcherBtn) {
        rightViewSwitcherBtn.addEventListener('click', () => {
            soundFx.playClick();
            setMobileView(activeMobileTab === 'control' ? 'paper' : 'control');
        });
    }

    window.addEventListener('resize', () => {
        setMobileView(activeMobileTab);
    });

    // Start with Kontrol & Soal active on mobile when page loads
    setMobileView('control');
    initProblem();
}
