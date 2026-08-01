<!-- Left Panel: Control & Interactive Calculator -->
<section id="panelControlSection" class="lg:col-span-5 flex flex-col gap-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 sm:p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-y-auto flex-1 h-full min-h-0">
    
    <!-- Compact Problem Input Form -->
    <form id="divisionForm" class="flex flex-col gap-2 shrink-0">
        <div class="grid grid-cols-5 items-center gap-2">
            <div class="col-span-2 flex flex-col gap-0.5">
                <label for="dividendInput" class="text-[10px] font-bold uppercase text-slate-400">Dibagi</label>
                <input type="number" id="dividendInput" value="24" min="1" max="99999" step="1" pattern="[0-9]*" inputmode="numeric" class="w-full p-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-base sm:text-lg font-bold text-center outline-none focus:ring-2 focus:ring-indigo-500" required>
            </div>
            <div class="col-span-1 text-center font-mono text-xl font-extrabold text-indigo-600 dark:text-indigo-400 pt-3">÷</div>
            <div class="col-span-2 flex flex-col gap-0.5">
                <label for="divisorInput" class="text-[10px] font-bold uppercase text-slate-400">Pembagi</label>
                <input type="number" id="divisorInput" value="2" min="1" max="999" step="1" pattern="[0-9]*" inputmode="numeric" class="w-full p-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-base sm:text-lg font-bold text-center outline-none focus:ring-2 focus:ring-indigo-500" required>
            </div>
        </div>

        <!-- Mode Selector -->
        <div class="grid grid-cols-2 gap-2">
            <label class="radio-card active cursor-pointer p-2 border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg flex items-center gap-2 transition" data-mode="interactive">
                <input type="radio" name="calcMode" value="interactive" class="hidden" checked>
                <i data-lucide="user-check" class="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0"></i>
                <div>
                    <strong class="block text-xs font-bold leading-tight">Interaktif</strong>
                    <small class="text-[9px] text-slate-400 leading-tight">Hitung sendiri</small>
                </div>
            </label>
            <label class="radio-card cursor-pointer p-2 border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 rounded-lg flex items-center gap-2 transition" data-mode="auto">
                <input type="radio" name="calcMode" value="auto" class="hidden">
                <i data-lucide="play-circle" class="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0"></i>
                <div>
                    <strong class="block text-xs font-bold leading-tight">Otomatis</strong>
                    <small class="text-[9px] text-slate-400 leading-tight">Simulasi animasi</small>
                </div>
            </label>
        </div>

        <button type="button" id="randomBtn" class="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer">
            <i data-lucide="dice-5" class="w-4 h-4"></i> Acak Soal Pembagian
        </button>
    </form>

    <!-- Inline Warning Banner for Invalid Non-Clean Division -->
    <div id="invalidDivisionWarning" class="hidden p-3 bg-red-50 dark:bg-red-950/40 border-2 border-red-500/60 rounded-xl flex flex-col gap-2 shrink-0 transition animate-step-row">
        <div class="flex items-center gap-1.5 text-xs font-extrabold text-red-600 dark:text-red-400">
            <i data-lucide="alert-triangle" class="w-4 h-4 text-red-500 shrink-0"></i>
            <span>Soal Tidak Habis Dibagi (Ada Koma)</span>
        </div>
        <div class="text-xs text-slate-700 dark:text-slate-300 leading-tight">
            Soal <span class="font-mono font-bold text-red-600 dark:text-red-400" id="warningCalcText">62 ÷ 4 = 15.5</span> tidak pas dibagi rata.
        </div>
        <button type="button" id="fixNumberBtn" class="w-full py-1.5 px-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow transition active:scale-95 cursor-pointer">
            <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Ganti ke <span id="suggestedCleanText" class="font-mono underline text-amber-200">60</span> agar Pas
        </button>
    </div>

    <!-- Interactive Step Calculator Box -->
    <div id="interactiveStepBox" class="sticky top-0 z-20 p-3 bg-emerald-50/95 dark:bg-slate-900/95 border-2 border-emerald-500/60 rounded-xl flex flex-col gap-2 shrink-0 shadow-md backdrop-blur-md">
        <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-extrabold uppercase rounded-full" id="stepCounterBadge">Langkah 1</span>
            <h3 class="text-xs font-bold" id="stepInstructionTitle">Cari Pengali</h3>
        </div>

        <div class="text-xs sm:text-sm text-slate-800 dark:text-slate-200" id="stepGuideText">
            Cari: <span class="font-mono font-extrabold text-amber-600 text-sm" id="currentDivisorText">2</span> × <strong>[ ? ]</strong> ≤ <span class="font-mono font-extrabold text-emerald-600 text-sm" id="currentRemainderText">24</span>
        </div>

        <!-- Step Input Row -->
        <div class="flex items-center justify-center gap-1.5 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-inner">
            <span class="font-mono text-base font-bold" id="formulaDivisor">2</span>
            <span class="font-mono text-base text-slate-400">×</span>
            <input type="number" id="userMultiplierInput" class="w-20 text-center p-1 bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500 rounded font-mono text-base font-bold text-emerald-600 outline-none" placeholder="10" min="1" step="1" pattern="[0-9]*" inputmode="numeric" autofocus>
            <span class="font-mono text-base text-slate-400">=</span>
            <span class="font-mono text-base font-bold text-purple-600 min-w-[35px] text-center" id="multiplierResultPreview">?</span>
        </div>

        <div class="flex gap-1.5">
            <button type="button" id="submitStepBtn" class="flex-1 py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer">
                <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Kurangkan (<span id="userSubResult">0</span>)
            </button>
            <button type="button" id="hintBtn" class="py-2 px-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-lg flex items-center justify-center gap-1 transition cursor-pointer">
                <i data-lucide="lightbulb" class="w-3.5 h-3.5 text-amber-500"></i> Bantuan
            </button>
        </div>

        <div id="stepFeedback" class="text-[11px] font-semibold min-h-[16px]"></div>
    </div>

    <!-- Auto Play Controls -->
    <div id="autoControlsBox" class="sticky top-0 z-20 p-3 bg-indigo-50/95 dark:bg-slate-900/95 border-2 border-indigo-500/60 rounded-xl flex flex-col gap-2 shrink-0 hidden shadow-md backdrop-blur-md">
        <div class="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Animasi Otomatis
        </div>
        <div class="flex gap-2">
            <button type="button" id="autoPlayPauseBtn" class="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer">
                <i data-lucide="pause" class="w-3.5 h-3.5"></i> Pause
            </button>
        </div>
    </div>
</section>
