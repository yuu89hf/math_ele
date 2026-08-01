<!-- Left Panel: Pengurangan Control Panel -->
<section id="subControlSection" class="lg:col-span-5 flex flex-col gap-3.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm overflow-y-auto flex-1 h-full min-h-0">
    
    <div class="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
        <h2 class="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <div class="p-1.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <i data-lucide="minus" class="w-4 h-4"></i>
            </div>
            <span>Kontrol Studio Pengurangan</span>
        </h2>
        <span class="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase rounded-full border border-indigo-500/20">Bersusun</span>
    </div>

    <!-- Soal Input Form -->
    <div class="flex flex-col gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <div class="flex items-center justify-between">
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300">Input Soal Pengurangan:</label>
            <button type="button" id="subRandomBtn" class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer">
                <i data-lucide="dice-5" class="w-3.5 h-3.5"></i> Acak Soal
            </button>
        </div>

        <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
                <label for="minuendInput" class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Angka Yang Dikurangi</label>
                <input type="number" id="minuendInput" value="27" min="1" max="999" step="1" pattern="[0-9]*" inputmode="numeric" 
                       class="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl font-mono text-base font-bold text-center text-indigo-600 dark:text-indigo-400 outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs transition" required>
            </div>

            <div class="flex flex-col gap-1">
                <label for="subtrahendInput" class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Angka Pengurang</label>
                <input type="number" id="subtrahendInput" value="9" min="0" max="999" step="1" pattern="[0-9]*" inputmode="numeric" 
                       class="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-rose-200 dark:border-rose-800 rounded-xl font-mono text-base font-bold text-center text-rose-600 dark:text-rose-400 outline-none focus:ring-2 focus:ring-rose-500 shadow-xs transition" required>
            </div>
        </div>
    </div>

    <!-- Step Execution Controls -->
    <div class="flex flex-col gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">Eksekusi Langkah Interaktif:</label>
        
        <div class="flex gap-2">
            <button type="button" id="subNextStepBtn" class="flex-1 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2">
                <i data-lucide="play" class="w-4 h-4"></i> Langkah Berikutnya
            </button>

            <button type="button" id="subResetStepBtn" class="py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs rounded-xl hover:bg-slate-100 transition cursor-pointer flex items-center justify-center gap-1.5">
                <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Reset
            </button>
        </div>

        <div id="subCurrentStepText" class="p-3 bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs text-indigo-900 dark:text-indigo-200 font-medium leading-relaxed">
            <!-- Step guide text -->
        </div>
    </div>

</section>
