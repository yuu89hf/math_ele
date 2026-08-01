<!-- Left Panel: FPB & KPK Interactive Control Panel -->
<section id="fpbControlSection" class="lg:col-span-5 flex flex-col gap-3.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm overflow-y-auto flex-1 h-full min-h-0">
    
    <div class="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
        <h2 class="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <div class="p-1.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <i data-lucide="sliders" class="w-4 h-4"></i>
            </div>
            <span>Kontrol Studio FPB & KPK</span>
        </h2>
        <span class="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase rounded-full border border-indigo-500/20">Interaktif</span>
    </div>

    <!-- 1. Selection: Number Count (2, 3, 4) -->
    <div class="flex flex-col gap-2 p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">Jumlah Angka:</label>
        <div class="grid grid-cols-3 gap-2">
            <button type="button" id="count-btn-2" class="count-btn py-1.5 px-3 rounded-xl text-xs font-extrabold bg-indigo-600 text-white shadow-xs border border-indigo-500 transition cursor-pointer">
                2 Angka
            </button>
            <button type="button" id="count-btn-3" class="count-btn py-1.5 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition cursor-pointer hover:bg-slate-50">
                3 Angka
            </button>
            <button type="button" id="count-btn-4" class="count-btn py-1.5 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition cursor-pointer hover:bg-slate-50">
                4 Angka
            </button>
        </div>
    </div>

    <!-- 2. Dynamic Inputs Container -->
    <div class="flex flex-col gap-2 p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">Input Nilai Angka:</label>
        <div id="dynamicNumbersContainer" class="grid grid-cols-2 gap-2.5 pt-1">
            <!-- Dynamic number inputs rendered via JS -->
        </div>
    </div>

    <!-- 3. Selection: Visual Method -->
    <div class="flex flex-col gap-2 p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">Metode Visualisasi:</label>
        <div class="grid grid-cols-2 gap-2">
            <button type="button" id="method-btn-sengkedan" class="method-btn py-2 px-3 rounded-xl text-xs font-extrabold bg-indigo-600 text-white shadow-xs border border-indigo-500 transition flex items-center justify-center gap-1.5 cursor-pointer">
                <i data-lucide="grid" class="w-3.5 h-3.5"></i> Sengkedan
            </button>
            <button type="button" id="method-btn-pohon" class="method-btn py-2 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50">
                <i data-lucide="git-fork" class="w-3.5 h-3.5"></i> Pohon Faktor
            </button>
            <button type="button" id="method-btn-garis" class="method-btn py-2 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50">
                <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> Garis Bilangan
            </button>
            <button type="button" id="method-btn-venn" class="method-btn py-2 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50">
                <i data-lucide="pie-chart" class="w-3.5 h-3.5"></i> Diagram Venn
            </button>
        </div>
    </div>

    <!-- Quick Live Calculation Badge -->
    <div class="mt-auto p-4 bg-indigo-50/80 dark:bg-indigo-950/40 border-2 border-indigo-500/30 rounded-2xl flex flex-col gap-2.5 shadow-2xs">
        <span class="text-xs font-extrabold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
            <i data-lucide="calculator" class="w-4 h-4 text-indigo-500"></i> Hasil Perhitungan Langsung:
        </span>
        <div id="summaryBadge" class="flex items-center gap-2.5 text-xs font-bold flex-wrap">
            <!-- Rendered via JS -->
        </div>
    </div>

</section>
