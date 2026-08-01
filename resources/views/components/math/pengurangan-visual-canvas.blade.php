<!-- Right Panel: Pengurangan Visual Canvas Output -->
<section id="subCanvasSection" class="lg:col-span-7 flex flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-y-auto flex-1 h-full min-h-0">
    <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3 shrink-0">
        <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <i data-lucide="eye" class="w-4 h-4"></i>
            </div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Papan Visual Pengurangan Bersusun</h2>
        </div>
        <span class="text-xs text-slate-400 font-bold">Teknik Meminjam (Regrouping)</span>
    </div>

    <!-- Papan Action Buttons: Langkah Berikutnya & Reset -->
    <div class="flex items-center gap-2 pb-2">
        <button type="button" id="subCanvasNextStepBtn" class="flex-1 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition cursor-pointer active:scale-95 flex items-center justify-center gap-2">
            <i data-lucide="play" class="w-4 h-4"></i> Langkah Berikutnya
        </button>

        <button type="button" id="subCanvasResetBtn" class="py-2.5 px-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-xs sm:text-sm rounded-xl transition cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700">
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Reset
        </button>
    </div>

    <!-- Blackboard Canvas Output Container -->
    <div id="subtractionBoardContainer" class="shrink-0">
        <!-- Rendered via JS -->
    </div>

    <!-- Step Explanation Logs List -->
    <div class="flex flex-col gap-2 pt-3 flex-1 min-h-0">
        <span class="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <i data-lucide="list-ordered" class="w-3.5 h-3.5"></i> Catatan Langkah Pengurangan:
        </span>
        <div id="subExplanationList" class="flex flex-col gap-2 overflow-y-auto flex-1 pr-1">
            <!-- Step logs rendered via JS -->
        </div>
    </div>
</section>
