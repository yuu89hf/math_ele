<!-- Victory Celebration Modal (Only Tutup Button) -->
<div id="victoryOverlay" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md hidden transition-all duration-300 p-4">
    <div class="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center gap-5 text-center transform animate-victory-zoom">
        
        <!-- Animated Trophy Icon -->
        <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg">
            <i data-lucide="award" class="w-9 h-9"></i>
        </div>

        <div class="flex flex-col gap-1">
            <h3 class="text-xl font-extrabold text-slate-900 dark:text-white">Pembagian Selesai!</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Selamat! Langkah-langkah pembagian berhasil diselesaikan secara sempurna.</p>
        </div>

        <!-- Summary Equation -->
        <div class="w-full p-3.5 bg-emerald-50 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700 rounded-2xl font-mono text-xl font-extrabold text-emerald-600 dark:text-emerald-400 shadow-inner" id="summaryEq">
            24 ÷ 2 = 12
        </div>

        <!-- Actions: Single Tutup Button -->
        <button type="button" id="closeVictoryBtn" class="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition active:scale-95 cursor-pointer">
            Tutup
        </button>
    </div>
</div>
