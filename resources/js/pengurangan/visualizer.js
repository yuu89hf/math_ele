/**
 * SubtractionVisualizer - Crisp Light Paper Digital Paper Renderer
 * Both original digits blur out smoothly without bouncing CSS animations.
 */
export class SubtractionVisualizer {
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

        // Render Borrow Badges Row (Static & Steady, NO animate-bounce!)
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

        // Render Minuend Top Digits Row (Pure Blur without strikethrough lines or shifting backgrounds)
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

        // Render Subtrahend Bottom Digits Row
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

        // Render Result Row
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

        // Crisp Light Theme Paper Style Blackboard
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
                    <!-- Borrow Badges Row (Steady, NO bounce!) -->
                    <div class="flex items-center gap-1">
                        ${borrowRowHtml}
                    </div>

                    <!-- Minuend Top Row -->
                    <div class="flex items-center gap-1">
                        ${topRowHtml}
                    </div>

                    <!-- Subtrahend Bottom Row with Minus Sign -->
                    <div class="flex items-center gap-1 relative">
                        <span class="font-mono text-2xl sm:text-3xl font-black text-rose-500 absolute -left-8 sm:-left-10">-</span>
                        ${botRowHtml}
                    </div>

                    <!-- Subtract Line -->
                    <div class="w-full h-1 bg-gradient-to-r from-rose-500 via-indigo-500 to-emerald-500 rounded-full my-1 shadow-xs"></div>

                    <!-- Result Row -->
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
                    💡 <strong>Logika Meminjam:</strong> Karena angka atas lebih kecil dari bawah, pinjam 1 puluhan (+10). Kedua angka asal <strong>2</strong> dan <strong>7</strong> mengecil & di-blur halus. Angka <strong>2</strong> berubah menjadi <strong>1</strong>, dan angka <strong>7</strong> berubah menjadi <strong>17</strong>!
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
