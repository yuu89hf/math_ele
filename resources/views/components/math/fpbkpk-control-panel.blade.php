<!-- Left Panel: FPB & KPK Interactive Control Panel -->
<section id="fpbControlSection" class="lg:col-span-5 flex flex-col gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-y-auto flex-1 h-full min-h-0">
    
    <div class="flex items-center justify-between">
        <h2 class="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="sliders" class="w-4 h-4 text-indigo-500"></i> Kontrol Studio FPB & KPK
        </h2>
        <span class="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase rounded-full">Interaktif</span>
    </div>

    <!-- 1. Selection: Number Count (2, 3, 4) -->
    <div class="flex flex-col gap-1.5 p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">Jumlah Angka:</label>
        <div class="grid grid-cols-3 gap-2">
            <button type="button" id="count-btn-2" class="count-btn py-1 px-2.5 rounded-lg text-xs font-extrabold bg-indigo-600 text-white shadow-xs border border-indigo-500 transition cursor-pointer">
                2 Angka
            </button>
            <button type="button" id="count-btn-3" class="count-btn py-1 px-2.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer">
                3 Angka
            </button>
            <button type="button" id="count-btn-4" class="count-btn py-1 px-2.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer">
                4 Angka
            </button>
        </div>
    </div>

    <!-- 2. Dynamic Inputs Container -->
    <div class="flex flex-col gap-1.5 p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">Input Nilai Angka:</label>
        <div id="dynamicNumbersContainer" class="grid grid-cols-2 gap-2 pt-1">
            <!-- Dynamic number inputs rendered via JS -->
        </div>
    </div>

    <!-- 3. Selection: Visual Method -->
    <div class="flex flex-col gap-1.5 p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">Metode Visualisasi:</label>
        <div class="grid grid-cols-2 gap-2">
            <button type="button" id="method-btn-sengkedan" class="method-btn py-1.5 px-2.5 rounded-lg text-xs font-extrabold bg-indigo-600 text-white shadow-xs border border-indigo-500 transition flex items-center justify-center gap-1.5 cursor-pointer">
                <i data-lucide="grid" class="w-3.5 h-3.5"></i> Sengkedan
            </button>
            <button type="button" id="method-btn-pohon" class="method-btn py-1.5 px-2.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer">
                <i data-lucide="git-fork" class="w-3.5 h-3.5"></i> Pohon Faktor
            </button>
            <button type="button" id="method-btn-garis" class="method-btn py-1.5 px-2.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer">
                <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> Garis Bilangan
            </button>
            <button type="button" id="method-btn-venn" class="method-btn py-1.5 px-2.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer">
                <i data-lucide="pie-chart" class="w-3.5 h-3.5"></i> Diagram Venn
            </button>
        </div>
    </div>

    <!-- Quick Live Calculation Badge -->
    <div class="mt-auto p-4 bg-indigo-50/80 dark:bg-indigo-950/40 border-2 border-indigo-500/30 rounded-2xl flex flex-col gap-2">
        <span class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">Ringkasan Hasil Langsung:</span>
        <div id="summaryBadge" class="flex items-center gap-2 text-xs font-bold flex-wrap">
            <span class="px-2 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg font-mono">FPB: <strong>12</strong></span>
            <span class="px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg font-mono">KPK: <strong>72</strong></span>
        </div>
    </div>

</section>
