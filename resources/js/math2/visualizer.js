/**
 * Division Visualizer Class (Math2)
 * Renders porogapit step animations and clean victory celebrations without DB/Score dependencies.
 */
export class DivisionVisualizer {
    constructor() {
        this.boardDivisor = document.getElementById('boardDivisor');
        this.boardDividend = document.getElementById('boardDividend');
        this.quotientDigitsWrapper = document.getElementById('quotientDigitsWrapper');
        this.verticalStepsContainer = document.getElementById('verticalStepsContainer');
        this.explanationList = document.getElementById('explanationList');
        this.victoryOverlay = document.getElementById('victoryOverlay');
        this.summaryEq = document.getElementById('summaryEq');
        this.autoCloseTimer = null;
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
                <div class="p-2 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-xs border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-bold">
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
            html += `<span class="px-1.5 py-0.5 bg-emerald-500/15 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-md animate-quotient-drop inline-block text-xs sm:text-sm shrink-0">${part}</span>`;
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
            <span class="absolute -right-5 sm:-right-6 text-xl sm:text-2xl font-bold text-red-500 animate-pop-minus">−</span>
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
        expItem.className = 'p-2 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-xs border border-slate-200 dark:border-slate-700/60 flex flex-col gap-0.5';
        expItem.innerHTML = `
            <div class="font-bold text-indigo-600 dark:text-indigo-400">Langkah ${stepObj.stepIndex}: <span class="text-slate-700 dark:text-slate-200">Pengali <code class="px-1 py-0.2 bg-indigo-100 dark:bg-indigo-900/50 rounded font-mono font-bold text-indigo-600 dark:text-indigo-400">${stepObj.multiplier}</code></span></div>
            <div class="text-slate-600 dark:text-slate-300">• ${this.boardDivisor.textContent} × ${stepObj.multiplier} = <strong class="text-purple-600 dark:text-purple-400">${stepObj.product}</strong></div>
            <div class="text-slate-600 dark:text-slate-300">• Sisa: ${stepObj.oldRemainder} − ${stepObj.product} = <strong class="text-emerald-600 dark:text-emerald-400">${stepObj.newRemainder}</strong></div>
        `;
        this.explanationList.appendChild(expItem);
        expItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    showVictory(dividend, divisor, quotient, totalSteps = 1, hintsUsed = 0, mode = 'interactive') {
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

        if (typeof window.showMath2Toast === 'function') {
            const toastMsg = mode === 'auto'
                ? `🎉 Simulasi Otomatis Selesai! ${dividend} ÷ ${divisor} = ${quotient}`
                : `🎉 Hore! Pembagian ${dividend} ÷ ${divisor} = ${quotient} selesai dengan benar!`;
            window.showMath2Toast(toastMsg, 'success');
        }
    }

    hideVictory() {
        if (this.victoryOverlay) {
            this.victoryOverlay.classList.add('hidden', 'pointer-events-none');
            this.victoryOverlay.classList.remove('pointer-events-auto');
        }
    }
}

// Global Toast Utility
window.showMath2Toast = function(message, type = 'success') {
    let container = document.getElementById('math2ToastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'math2ToastContainer';
        container.className = 'fixed top-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    const bgClass = isSuccess ? 'bg-emerald-600/95 text-white shadow-emerald-500/20 border border-emerald-400/40' : 'bg-rose-600/95 text-white shadow-rose-500/20 border border-rose-400/40';
    const icon = isSuccess ? '🎉' : '⚠️';

    toast.className = `pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-2xl backdrop-blur-md font-bold text-xs sm:text-sm transform transition-all duration-300 translate-y-[-10px] opacity-0 ${bgClass}`;
    toast.innerHTML = `
        <div class="flex items-center gap-2.5 flex-1 min-w-0">
            <span class="text-base shrink-0">${icon}</span>
            <div class="flex-1 leading-snug truncate">${message}</div>
        </div>
        <button type="button" onclick="this.closest('#math2ToastContainer > div').remove()" class="text-white/80 hover:text-white text-xs font-extrabold px-2 py-1 rounded bg-black/20 hover:bg-black/30 shrink-0 cursor-pointer">✕</button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-[-10px]', 'opacity-0');
    });

    setTimeout(() => {
        if (toast && toast.parentElement) {
            toast.classList.add('opacity-0', 'translate-y-[-10px]');
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
};
