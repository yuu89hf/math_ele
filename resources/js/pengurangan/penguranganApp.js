/**
 * Studio Pengurangan App Controller Module
 * Handles vertical subtraction logic, step-by-step interactive execution, sound SFX, & mobile view auto-switching
 */
import { SoundEffects, BGMController } from '../math2/audio.js';
import { SubtractionEngine } from './engine.js';
import { SubtractionVisualizer } from './visualizer.js';

export function initPenguranganApp() {
    if (typeof window.lucide !== 'undefined') {
        window.lucide.createIcons();
    }

    const minuendInput = document.getElementById('minuendInput');
    const subtrahendInput = document.getElementById('subtrahendInput');
    if (!minuendInput || !subtrahendInput) return; // Not on Pengurangan page

    const soundFx = new SoundEffects();
    const bgmPlayer = new BGMController();
    const engine = new SubtractionEngine(27, 9);
    const visualizer = new SubtractionVisualizer();

    const randomBtn = document.getElementById('subRandomBtn');
    const nextStepBtn = document.getElementById('subNextStepBtn');
    const resetStepBtn = document.getElementById('subResetStepBtn');
    
    // Canvas Papan Visual Action Buttons
    const canvasNextStepBtn = document.getElementById('subCanvasNextStepBtn');
    const canvasResetBtn = document.getElementById('subCanvasResetBtn');

    const currentStepText = document.getElementById('subCurrentStepText');

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const bgmToggleBtn = document.getElementById('bgmToggleBtn');

    const panelControlSection = document.getElementById('subControlSection');
    const panelCanvasSection = document.getElementById('subCanvasSection');
    const mobileTabControl = document.getElementById('mobileTabControl');
    const mobileTabPaper = document.getElementById('mobileTabPaper');
    const rightViewSwitcherBtn = document.getElementById('rightViewSwitcherBtn');
    const rightViewText = document.getElementById('rightViewText');

    let activeMobileTab = 'control'; // Default starts at Kontrol & Soal on Mobile

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
        soundFx.playClick();
        const res = engine.executeCurrentStep();

        if (!res.success) {
            soundFx.playError();
            return;
        }

        soundFx.playStepSuccess();
        visualizer.render(engine);
        visualizer.addExplanation(res.step);

        // Auto switch to Papan Visual on mobile after executing step from Kontrol Soal!
        setMobileView('paper');

        if (res.isFinished) {
            soundFx.playVictory();
        }

        updateStepGuide();
    }

    // Event Listeners for Control Panel
    if (minuendInput) minuendInput.addEventListener('input', initProblem);
    if (subtrahendInput) subtrahendInput.addEventListener('input', initProblem);

    if (nextStepBtn) nextStepBtn.addEventListener('click', executeNextStep);
    if (resetStepBtn) {
        resetStepBtn.addEventListener('click', () => {
            soundFx.playClick();
            initProblem();
        });
    }

    // Event Listeners for Papan Visual Canvas Action Buttons
    if (canvasNextStepBtn) canvasNextStepBtn.addEventListener('click', executeNextStep);
    if (canvasResetBtn) {
        canvasResetBtn.addEventListener('click', () => {
            soundFx.playClick();
            initProblem();
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            soundFx.playClick();
            const minuends = [27, 42, 53, 61, 74, 85, 93, 105, 124];
            const subtrahends = [9, 15, 28, 37, 46, 58, 69, 78, 89];
            
            const min = minuends[Math.floor(Math.random() * minuends.length)];
            const sub = subtrahends[Math.floor(Math.random() * subtrahends.length)];

            if (minuendInput) minuendInput.value = min;
            if (subtrahendInput) subtrahendInput.value = sub;

            initProblem();
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
