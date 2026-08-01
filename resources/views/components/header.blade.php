<header class="w-full flex items-center justify-between gap-2.5 p-2.5 sm:p-3.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm shrink-0 mb-3 relative z-30">
    <!-- Brand Logo & Nav Tabs -->
    <div class="flex items-center gap-3 sm:gap-5 overflow-x-auto">
        <a href="{{ route('portal') }}" class="flex items-center gap-2 font-extrabold text-sm sm:text-base text-indigo-600 dark:text-indigo-400 shrink-0 group">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <i data-lucide="calculator" class="w-5 h-5"></i>
            </div>
            <div class="flex flex-col leading-none">
                <span class="font-extrabold text-slate-900 dark:text-white text-sm">Math Studio</span>
                <span class="text-[10px] text-slate-400 font-semibold hidden sm:inline">Media Belajar SD</span>
            </div>
        </a>

        <div class="h-6 w-px bg-slate-200 dark:bg-slate-800 shrink-0 hidden sm:block"></div>

        <!-- Desktop Navigation Tabs -->
        <nav class="hidden sm:flex items-center gap-1.5">
            <a href="{{ route('portal') }}" class="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer {{ request()->routeIs('portal') ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' }}">
                <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i> Menu Utama
            </a>
            <a href="{{ route('fpbkpk') }}" class="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer {{ request()->routeIs('fpbkpk') ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' }}">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-500"></i> FPB & KPK
            </a>
            <a href="{{ route('pembagian') }}" class="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer {{ request()->routeIs('pembagian') ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' }}">
                <i data-lucide="divide" class="w-3.5 h-3.5 text-purple-500"></i> Studio Pembagian
            </a>
        </nav>
    </div>

    <!-- Right Controls: Audio + Page Burger + View Switcher -->
    <div class="flex items-center gap-1.5 shrink-0">
        <!-- BGM Toggle Button -->
        <button type="button" id="bgmToggleBtn" title="BGM Musik Latar" class="p-2 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition cursor-pointer active:scale-95">
            <i data-lucide="music" class="w-4 h-4"></i>
        </button>

        <!-- Sound SFX Toggle Button -->
        <button type="button" id="soundToggleBtn" title="Efek Suara (SFX)" class="p-2 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition cursor-pointer active:scale-95">
            <i data-lucide="volume-2" class="w-4 h-4"></i>
        </button>

        <!-- Dark/Light Theme Toggle -->
        <button type="button" id="themeToggleBtn" title="Mode Gelap/Terang" class="p-2 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition cursor-pointer active:scale-95">
            <i data-lucide="moon" class="w-4 h-4 hidden dark:inline"></i>
            <i data-lucide="sun" class="w-4 h-4 inline dark:hidden text-amber-500"></i>
        </button>

        @if(!request()->routeIs('portal'))
            <!-- Mobile View Switcher Button (Right Burger for Kontrol vs Visual Canvas) -->
            <button type="button" id="rightViewSwitcherBtn" title="Pindah Tampilan: Kontrol / Papan Visual" class="lg:hidden p-2 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl border border-purple-200 dark:border-purple-800 transition cursor-pointer active:scale-95 flex items-center gap-1 font-bold text-xs">
                <i data-lucide="layers" class="w-4 h-4"></i>
                <span id="rightViewText" class="text-[11px] hidden sm:inline">Papan</span>
            </button>
        @endif

        <!-- Mobile Page Navigation Hamburger Button -->
        <button type="button" id="hamburgerBtn" title="Pindah Halaman" class="sm:hidden p-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-200 dark:border-indigo-800 transition cursor-pointer active:scale-95">
            <i data-lucide="menu" class="w-5 h-5"></i>
        </button>
    </div>
</header>

<!-- Mobile Page Navigation Drawer Modal -->
<div id="mobileMenuDrawer" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden flex flex-col justify-end sm:hidden transition-all duration-300">
    <div class="bg-white dark:bg-slate-900 border-t-2 border-indigo-500 rounded-t-3xl p-5 flex flex-col gap-4 shadow-2xl animate-step-row">
        
        <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                    <i data-lucide="calculator" class="w-4 h-4"></i>
                </div>
                <span class="font-extrabold text-sm text-slate-900 dark:text-white">Pindah Halaman</span>
            </div>
            <button type="button" id="closeMobileDrawerBtn" class="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer font-bold text-base">
                ✕
            </button>
        </div>

        <!-- Mobile Menu Nav Links -->
        <div class="flex flex-col gap-2">
            <a href="{{ route('portal') }}" class="p-3 rounded-xl font-extrabold text-sm flex items-center justify-between transition {{ request()->routeIs('portal') ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200' }}">
                <div class="flex items-center gap-3">
                    <i data-lucide="layout-grid" class="w-4 h-4"></i> Menu Utama (Portal)
                </div>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </a>
            <a href="{{ route('fpbkpk') }}" class="p-3 rounded-xl font-extrabold text-sm flex items-center justify-between transition {{ request()->routeIs('fpbkpk') ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200' }}">
                <div class="flex items-center gap-3">
                    <i data-lucide="sparkles" class="w-4 h-4 text-amber-500"></i> Studio FPB & KPK
                </div>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </a>
            <a href="{{ route('pembagian') }}" class="p-3 rounded-xl font-extrabold text-sm flex items-center justify-between transition {{ request()->routeIs('pembagian') ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200' }}">
                <div class="flex items-center gap-3">
                    <i data-lucide="divide" class="w-4 h-4 text-purple-500"></i> Studio Pembagian
                </div>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </a>
        </div>

    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
        const closeMobileDrawerBtn = document.getElementById('closeMobileDrawerBtn');

        if (hamburgerBtn && mobileMenuDrawer) {
            hamburgerBtn.addEventListener('click', () => {
                mobileMenuDrawer.classList.remove('hidden');
            });
        }

        if (closeMobileDrawerBtn && mobileMenuDrawer) {
            closeMobileDrawerBtn.addEventListener('click', () => {
                mobileMenuDrawer.classList.add('hidden');
            });
        }

        if (mobileMenuDrawer) {
            mobileMenuDrawer.addEventListener('click', (e) => {
                if (e.target === mobileMenuDrawer) {
                    mobileMenuDrawer.classList.add('hidden');
                }
            });
        }
    });
</script>
