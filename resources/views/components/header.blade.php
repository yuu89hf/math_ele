<header class="w-full flex items-center justify-between gap-2 p-2 sm:p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs shrink-0 mb-3">
    <!-- Brand Logo & Nav Tabs -->
    <div class="flex items-center gap-3 sm:gap-4 overflow-x-auto">
        <a href="{{ route('portal') }}" class="flex items-center gap-2 font-extrabold text-sm sm:text-base text-indigo-600 dark:text-indigo-400 shrink-0">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <i data-lucide="calculator" class="w-4 h-4"></i>
            </div>
            <span class="hidden sm:inline">Math Studio</span>
        </a>

        <div class="h-5 w-px bg-slate-200 dark:bg-slate-800 shrink-0"></div>

        <!-- Navigation Tabs -->
        <nav class="flex items-center gap-1">
            <a href="{{ route('portal') }}" class="px-2.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition {{ request()->routeIs('portal') ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' }}">
                <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i> Menu Utama
            </a>
            <a href="{{ route('fpbkpk') }}" class="px-2.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition {{ request()->routeIs('fpbkpk') ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' }}">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-400"></i> FPB & KPK
            </a>
            <a href="{{ route('pembagian') }}" class="px-2.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition {{ request()->routeIs('pembagian') ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' }}">
                <i data-lucide="divide" class="w-3.5 h-3.5 text-purple-400"></i> Studio Pembagian
            </a>
        </nav>
    </div>

    <!-- Quick Audio & Theme Control Actions -->
    <div class="flex items-center gap-1.5 shrink-0">
        <!-- BGM Toggle Button -->
        <button type="button" id="bgmToggleBtn" title="BGM Musik Latar" class="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition cursor-pointer">
            <i data-lucide="music" class="w-4 h-4"></i>
        </button>

        <!-- Sound SFX Toggle Button -->
        <button type="button" id="soundToggleBtn" title="Efek Suara (SFX)" class="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition cursor-pointer">
            <i data-lucide="volume-2" class="w-4 h-4"></i>
        </button>

        <!-- Dark/Light Theme Toggle -->
        <button type="button" id="themeToggleBtn" title="Mode Gelap/Terang" class="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition cursor-pointer">
            <i data-lucide="moon" class="w-4 h-4 hidden dark:inline"></i>
            <i data-lucide="sun" class="w-4 h-4 inline dark:hidden text-amber-500"></i>
        </button>
    </div>
</header>
