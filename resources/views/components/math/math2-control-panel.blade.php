<!-- Left Panel: Control & Interactive Calculator -->
<section id="panelControlSection" class="lg:col-span-5 flex flex-col gap-3.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm overflow-y-auto flex-1 h-full min-h-0">
    
    <!-- Compact Problem Input Form -->
    <form id="divisionForm" class="flex flex-col gap-2.5 shrink-0">
        <div class="grid grid-cols-5 items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
            <div class="col-span-2 flex flex-col gap-1">
                <label for="dividendInput" class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Dibagi</label>
                <input type="number" id="dividendInput" value="24" min="1" max="99999" step="1" pattern="[0-9]*" inputmode="numeric" class="w-full p-2 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl font-mono text-lg sm:text-xl font-bold text-center text-indigo-600 dark:text-indigo-400 outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs transition" required>
            </div>
            <div class="col-span-1 text-center font-mono text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 pt-3">÷</div>
            <div class="col-span-2 flex flex-col gap-1">
                <label for="divisorInput" class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Pembagi</label>
                <input type="number" id="divisorInput" value="2" min="1" max="999" step="1" pattern="[0-9]*" inputmode="numeric" class="w-full p-2 bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-800 rounded-xl font-mono text-lg sm:text-xl font-bold text-center text-purple-600 dark:text-purple-400 outline-none focus:ring-2 focus:ring-purple-500 shadow-2xs transition" required>
            </div>
        </div>

        <button type="button" id="randomBtn" class="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer">
            <i data-lucide="dice-5" class="w-4 h-4"></i> Acak Soal Pembagian
        </button>
    </form>

    <!-- Inline Warning Banner for Invalid Non-Clean Division -->
    <div id="invalidDivisionWarning" class="hidden p-3.5 bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-400/80 rounded-2xl flex flex-col gap-2 shrink-0 transition animate-step-row shadow-xs">
        <div class="flex items-center gap-1.5 text-xs font-extrabold text-rose-600 dark:text-rose-400">
            <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-500 shrink-0"></i>
            <span>Soal Tidak Habis Dibagi (Ada Koma)</span>
        </div>
        <div class="text-xs text-slate-700 dark:text-slate-300 leading-tight">
            Soal <span class="font-mono font-bold text-rose-600 dark:text-rose-400" id="warningCalcText">62 ÷ 4 = 15.5</span> tidak pas dibagi rata.
        </div>
        <button type="button" id="fixNumberBtn" class="w-full py-1.5 px-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow transition active:scale-95 cursor-pointer">
            <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Ganti ke <span id="suggestedCleanText" class="font-mono underline text-amber-200">60</span> agar Pas
        </button>
    </div>

    <!-- Interactive Step Calculator Box -->
    <div id="interactiveStepBox" class="sticky top-0 z-20 p-3.5 bg-emerald-50/95 dark:bg-slate-900/95 border-2 border-emerald-500/60 rounded-2xl flex flex-col gap-2.5 shrink-0 shadow-md backdrop-blur-md">
        <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-extrabold uppercase rounded-full shadow-2xs" id="stepCounterBadge">Langkah 1</span>
            <h3 class="text-xs font-bold text-emerald-800 dark:text-emerald-300" id="stepInstructionTitle">Cari Pengali</h3>
        </div>

        <div class="text-xs sm:text-sm text-slate-800 dark:text-slate-200" id="stepGuideText">
            Cari: <span class="font-mono font-extrabold text-amber-600 text-sm" id="currentDivisorText">2</span> × <strong>[ ? ]</strong> ≤ <span class="font-mono font-extrabold text-emerald-600 text-sm" id="currentRemainderText">24</span>
        </div>

        <!-- Step Input Row -->
        <div class="flex items-center justify-center gap-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-inner">
            <span class="font-mono text-base font-bold text-slate-800 dark:text-slate-200" id="formulaDivisor">2</span>
            <span class="font-mono text-base text-slate-400">×</span>
            <input type="number" id="userMultiplierInput" class="w-20 text-center p-1.5 bg-slate-50 dark:bg-slate-800 border-2 border-emerald-500 rounded-lg font-mono text-base font-extrabold text-emerald-600 outline-none" placeholder="10" min="1" step="1" pattern="[0-9]*" inputmode="numeric" autofocus>
            <span class="font-mono text-base text-slate-400">=</span>
            <span class="font-mono text-base font-bold text-purple-600 min-w-[35px] text-center" id="multiplierResultPreview">?</span>
        </div>

        <div class="flex gap-2">
            <button type="button" id="submitStepBtn" class="flex-1 py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer">
                <i data-lucide="check-circle-2" class="w-4 h-4"></i> Kurangkan (<span id="userSubResult">0</span>)
            </button>
            <button type="button" id="hintBtn" class="py-2 px-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer">
                <i data-lucide="lightbulb" class="w-3.5 h-3.5 text-amber-500"></i> Bantuan
            </button>
        </div>

        <div id="stepFeedback" class="text-[11px] font-semibold min-h-[16px]"></div>
    </div>

    <!-- Step Explanation Log -->
    <div class="flex-1 min-h-[120px] bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto flex flex-col gap-1.5 shadow-inner" id="explanationList">
        <div class="p-2 bg-white dark:bg-slate-900 rounded-lg text-xs border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold">
            Siap menghitung pembagian.
        </div>
    </div>
</section>
