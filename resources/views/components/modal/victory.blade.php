<!-- Victory Celebration Modal (No Score System) -->
<div id="victoryOverlay" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md hidden transition-all duration-300 p-4">
    <div class="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center gap-4 text-center transform animate-victory-zoom">
        
        <!-- Animated Trophy Icon -->
        <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg">
            <i data-lucide="award" class="w-9 h-9"></i>
        </div>

        <div class="flex flex-col gap-1">
            <h3 class="text-xl font-extrabold text-slate-900 dark:text-white">Pembagian Selesai!</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Selamat! Langkah-langkah pembagian berhasil diselesaikan secara sempurna.</p>
        </div>

        <!-- Summary Equation -->
        <div class="w-full p-3 bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 rounded-2xl font-mono text-lg font-extrabold text-emerald-600 dark:text-emerald-400 shadow-inner" id="summaryEq">
            24 ÷ 2 = 12
        </div>

        <!-- Actions -->
        <div class="flex gap-2 w-full pt-2">
            <button type="button" id="resetVictoryBtn" class="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer">
                <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Soal Baru
            </button>
            <button type="button" id="closeVictoryBtn" class="py-2.5 px-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer">
                Tutup
            </button>
        </div>
    </div>
</div>
