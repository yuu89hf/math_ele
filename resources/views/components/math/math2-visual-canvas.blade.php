<!-- Right Panel: Visual Board & Step History -->
<section id="panelPaperSection" class="lg:col-span-7 flex flex-col gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 sm:p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex-1 h-full min-h-0">
    <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <i data-lucide="pen-tool" class="w-4 h-4"></i>
            </div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Papan Porogapit Studio</h2>
        </div>
        <span class="text-xs text-slate-400 font-bold">Visualisasi Bersusun</span>
    </div>

    <!-- Blackboard Canvas Viewport -->
    <div class="relative flex-1 bg-slate-900 text-slate-100 rounded-xl p-4 overflow-y-auto flex flex-col justify-start items-center border border-slate-800 shadow-inner font-mono">
        
        <!-- Porogapit Bracket Layout -->
        <div class="flex flex-col items-start min-w-[200px] max-w-full">
            <!-- Top Quotient Line -->
            <div class="flex items-center gap-1 pl-12 pb-1 border-b-2 border-slate-300 min-h-[36px]" id="quotientDigitsWrapper">
                <span class="q-placeholder text-slate-400 font-bold">?</span>
            </div>

            <!-- Porogapit Division Bracket -->
            <div class="flex items-start pt-2">
                <div id="boardDivisor" class="text-3xl sm:text-4xl font-bold text-amber-400 pr-2 pt-0.5">2</div>
                <div class="border-l-2 border-slate-300 pl-3 min-h-[160px] flex flex-col items-end">
                    <div id="boardDividend" class="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2 tracking-[0.08em]">24</div>
                    
                    <!-- Vertical Subtraction Steps -->
                    <div id="verticalStepsContainer" class="w-full flex flex-col items-end">
                        <!-- Step rows injected dynamically -->
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Step Explanation Log -->
    <div class="h-28 shrink-0 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 overflow-y-auto flex flex-col gap-1.5" id="explanationList">
        <div class="p-2 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-xs border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-bold">
            Siap menghitung pembagian.
        </div>
    </div>
</section>
