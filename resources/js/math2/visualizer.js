/**
 * Division Visualizer Class (Math2)
 * Renders porogapit step animations and clean victory celebration modal.
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

        if (typeof window.showMath2Toast === 'function') {
            window.showMath2Toast(`🎉 Selamat! Pembagian ${dividend} ÷ ${divisor} = ${quotient} selesai dengan benar!`, 'success');
        }
    }

    hideVictory() {
        if (this.victoryOverlay) {
            this.victoryOverlay.classList.add('hidden', 'pointer-events-none');
            this.victoryOverlay.classList.remove('pointer-events-auto');
        }
    }
}
