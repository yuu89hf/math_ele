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
    const modeCards = document.querySelectorAll('.radio-card');
    
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

    const autoControlsBox = document.getElementById('autoControlsBox');
    const autoPlayPauseBtn = document.getElementById('autoPlayPauseBtn');
    const randomBtn = document.getElementById('randomBtn');

    const invalidDivisionWarning = document.getElementById('invalidDivisionWarning');
    const warningCalcText = document.getElementById('warningCalcText');
    const fixNumberBtn = document.getElementById('fixNumberBtn');
    const suggestedCleanText = document.getElementById('suggestedCleanText');

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const bgmToggleBtn = document.getElementById('bgmToggleBtn');

    const resetVictoryBtn = document.getElementById('resetVictoryBtn');
    const closeVictoryBtn = document.getElementById('closeVictoryBtn');

    const panelControlSection = document.getElementById('panelControlSection');
    const panelPaperSection = document.getElementById('panelPaperSection');
    const mobileTabControl = document.getElementById('mobileTabControl');
    const mobileTabPaper = document.getElementById('mobileTabPaper');

    if (!divisionForm || !dividendInput || !divisorInput) {
        return; // Not on Math2 page
    }

    let currentMode = 'interactive';
    let autoPlayer = {
        timer: null,
        isPlaying: false,
        steps: [],
        currentIndex: 0,
        speed: 2500
    };

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
        stopAutoPlay();

        let dividend = parseInt(dividendInput.value, 10);
        let divisor = parseInt(divisorInput.value, 10);

        if (isNaN(dividend) || dividend < 1) dividend = 24;
        if (isNaN(divisor) || divisor < 1) divisor = 2;

        updateWarningState();

        engine.reset(dividend, divisor);
        visualizer.initBoard(dividend, divisor);

        if (currentMode === 'interactive') {
            if (interactiveStepBox) interactiveStepBox.classList.remove('hidden');
            if (autoControlsBox) autoControlsBox.classList.add('hidden');
            updateInteractiveBox();
        } else {
            if (interactiveStepBox) interactiveStepBox.classList.add('hidden');
            if (autoControlsBox) autoControlsBox.classList.remove('hidden');
            prepareAutoSolution();
        }
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
            userMultiplierInput.focus();
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

        if (res.isFinished) {
            soundFx.playVictory();
            visualizer.showVictory(engine.dividend, engine.divisor, res.totalQuotient, engine.steps.length, 0, 'interactive');
        }

        updateInteractiveBox();
    }

    function prepareAutoSolution() {
        const fullSol = engine.generateFullSolution();
        autoPlayer.steps = fullSol.steps;
        autoPlayer.currentIndex = 0;
        startAutoPlay();
    }

    function startAutoPlay() {
        autoPlayer.isPlaying = true;
        if (autoPlayPauseBtn) autoPlayPauseBtn.innerHTML = `<i data-lucide="pause" class="w-3.5 h-3.5"></i> Pause`;
        if (typeof window.lucide !== 'undefined') window.lucide.createIcons();

        if (autoPlayer.timer) clearInterval(autoPlayer.timer);

        autoPlayer.timer = setInterval(() => {
            if (!autoPlayer.isPlaying) return;

            if (autoPlayer.currentIndex >= autoPlayer.steps.length) {
                stopAutoPlay();
                soundFx.playVictory();
                const totalQuotient = engine.generateFullSolution().totalQuotient;
                visualizer.showVictory(engine.dividend, engine.divisor, totalQuotient, autoPlayer.steps.length, 0, 'auto');
                return;
            }

            const step = autoPlayer.steps[autoPlayer.currentIndex];
            engine.quotientParts.push(step.multiplier);
            const isLast = autoPlayer.currentIndex === autoPlayer.steps.length - 1;

            soundFx.playStepSuccess();
            visualizer.renderQuotientParts(engine.quotientParts, isLast);
            visualizer.renderStepRow(step, isLast);
            visualizer.addExplanation(step);

            autoPlayer.currentIndex++;
        }, autoPlayer.speed);
    }

    function stopAutoPlay() {
        autoPlayer.isPlaying = false;
        if (autoPlayer.timer) {
            clearInterval(autoPlayer.timer);
            autoPlayer.timer = null;
        }
        if (autoPlayPauseBtn) autoPlayPauseBtn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5"></i> Putar`;
        if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
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

    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            soundFx.playClick();
            modeCards.forEach(c => c.classList.remove('border-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-950/40'));
            card.classList.add('border-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-950/40');
            
            const radio = card.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                currentMode = radio.value;
                initProblem();
            }
        });
    });

    if (autoPlayPauseBtn) {
        autoPlayPauseBtn.addEventListener('click', () => {
            soundFx.playClick();
            if (autoPlayer.isPlaying) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });
    }

    if (resetVictoryBtn) {
        resetVictoryBtn.addEventListener('click', () => {
            soundFx.playClick();
            visualizer.hideVictory();
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

    // Mobile Navigation Tabs
    if (mobileTabControl && mobileTabPaper) {
        mobileTabControl.addEventListener('click', () => {
            if (panelControlSection) panelControlSection.classList.remove('hidden');
            if (panelPaperSection) panelPaperSection.classList.add('hidden');
            mobileTabControl.classList.add('bg-white', 'dark:bg-slate-800', 'shadow-xs', 'text-indigo-600');
            mobileTabPaper.classList.remove('bg-white', 'dark:bg-slate-800', 'shadow-xs', 'text-indigo-600');
        });

        mobileTabPaper.addEventListener('click', () => {
            if (panelControlSection) panelControlSection.classList.add('hidden');
            if (panelPaperSection) panelPaperSection.classList.remove('hidden');
            mobileTabPaper.classList.add('bg-white', 'dark:bg-slate-800', 'shadow-xs', 'text-indigo-600');
            mobileTabControl.classList.remove('bg-white', 'dark:bg-slate-800', 'shadow-xs', 'text-indigo-600');
        });
    }

    // Initialize first state
    initProblem();
}
