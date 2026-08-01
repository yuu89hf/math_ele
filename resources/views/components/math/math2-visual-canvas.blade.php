<!-- Right Panel: Visual Board & Step History -->
<section id="panelPaperSection" class="lg:col-span-7 flex flex-col gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 sm:p-5 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex-1 h-full min-h-0">
    <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <i data-lucide="pen-tool" class="w-4 h-4"></i>
            </div>
            <div class="flex flex-col leading-none">
                <h2 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">Papan Porogapit Studio</h2>
                <span class="text-[10px] text-slate-400 font-semibold">Visualisasi Bersusun Interaktif</span>
            </div>
        </div>
        <span class="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[11px] font-extrabold rounded-lg border border-emerald-200 dark:border-emerald-800">
            Kalkulator Porogapit
        </span>
    </div>

    <!-- Digital Math Paper Viewport Container -->
    <div class="relative flex-1 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-2xl p-4 sm:p-6 overflow-y-auto flex flex-col justify-start items-center border border-slate-200 dark:border-slate-800 shadow-inner font-mono bg-grid-pattern">
        
        <!-- Porogapit Bracket Layout -->
        <div class="flex flex-col items-start min-w-[220px] max-w-full my-auto">
            <!-- Top Quotient Line -->
            <div class="flex items-center gap-1.5 pl-14 pb-1 border-b-3 border-indigo-600 dark:border-indigo-400 min-h-[42px] w-full" id="quotientDigitsWrapper">
                <span class="q-placeholder text-slate-400 font-bold">?</span>
            </div>

            <!-- Porogapit Division Bracket -->
            <div class="flex items-start pt-3">
                <div id="boardDivisor" class="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 pr-3 pt-0.5">2</div>
                <div class="border-l-3 border-indigo-600 dark:border-indigo-400 pl-4 min-h-[180px] flex flex-col items-end w-full">
                    <div id="boardDividend" class="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-3 tracking-[0.08em]">24</div>
                    
                    <!-- Vertical Subtraction Steps -->
                    <div id="verticalStepsContainer" class="w-full flex flex-col items-end">
                        <!-- Step rows injected dynamically -->
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Step Explanation Log -->
    <div class="h-28 shrink-0 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 overflow-y-auto flex flex-col gap-1.5" id="explanationList">
        <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-xs border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold">
            Siap menghitung pembagian.
        </div>
    </div>
</section>
