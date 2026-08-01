<x-layout.app title="Math Learning Studio - Pilih Studio Pembelajaran">
    <!-- Top Navigation Header -->
    <x-header />

    <!-- Welcome Selection Viewport Container (Mobile Optimized) -->
    <main class="flex-1 flex flex-col justify-center items-center gap-5 sm:gap-8 p-4 sm:p-8 overflow-y-auto h-full min-h-0">
        
        <!-- Hero Section -->
        <div class="text-center max-w-2xl flex flex-col gap-2 sm:gap-3 py-2">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold rounded-full self-center border border-indigo-200 dark:border-indigo-800 shadow-xs">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-500"></i> Platform Matematika SD Interaktif
            </span>
            <h1 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Pilih Studio Pembelajaran
            </h1>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
                Pilih modul pembelajaran matematika interaktif yang ingin dipelajari hari ini. Tanpa database, tanpa skor, dan 100% cepat & ramah mobile!
            </p>
        </div>

        <!-- Tool Selection Grid (FPB & KPK vs Studio Pembagian vs Studio Pengurangan) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl w-full">
            
            <!-- Card 1: FPB & KPK Studio -->
            <a href="{{ route('fpbkpk') }}" class="group relative p-5 sm:p-7 bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 active:scale-[0.98] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-5 overflow-hidden">
                <div class="absolute -right-8 -top-8 w-36 h-36 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                
                <div class="flex flex-col gap-3.5 relative z-10">
                    <div class="flex items-center justify-between">
                        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                            <i data-lucide="git-fork" class="w-6 h-6 sm:w-7 sm:h-7"></i>
                        </div>
                        <span class="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-200 dark:border-emerald-800">Modul 01</span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <h2 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            Studio FPB & KPK
                        </h2>
                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            Visualisasikan Faktor Persekutuan Terbesar dan Kelipatan Persekutuan Terkecil menggunakan diagram Pohon Faktor interaktif.
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-1.5 pt-1">
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] sm:text-[11px] rounded-lg">Pohon Faktor Dahan</span>
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] sm:text-[11px] rounded-lg">Target FPB & KPK</span>
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] sm:text-[11px] rounded-lg">Highlight Warna</span>
                    </div>
                </div>

                <div class="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                    <span class="text-xs font-extrabold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Buka Studio FPB & KPK</span>
                    <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-600 text-slate-700 dark:text-slate-300 group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1 shadow-2xs">
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </a>

            <!-- Card 2: Studio Pembagian Porogapit -->
            <a href="{{ route('pembagian') }}" class="group relative p-5 sm:p-7 bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 active:scale-[0.98] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-5 overflow-hidden">
                <div class="absolute -right-8 -top-8 w-36 h-36 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

                <div class="flex flex-col gap-3.5 relative z-10">
                    <div class="flex items-center justify-between">
                        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-purple-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
                            <i data-lucide="divide" class="w-6 h-6 sm:w-7 sm:h-7"></i>
                        </div>
                        <span class="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-lg border border-purple-200 dark:border-purple-800">Modul 02</span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <h2 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            Studio Pembagian
                        </h2>
                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            Belajar pembagian bersusun (porogapit) dengan panduan interaktif langkah demi langkah pada papan tulis digital.
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-1.5 pt-1">
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] sm:text-[11px] rounded-lg">Porogapit Bersusun</span>
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] sm:text-[11px] rounded-lg">Langkah Interaktif</span>
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] sm:text-[11px] rounded-lg">Papan Tulis Digital</span>
                    </div>
                </div>

                <div class="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                    <span class="text-xs font-extrabold text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Buka Studio Pembagian</span>
                    <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-purple-600 text-slate-700 dark:text-slate-300 group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1 shadow-2xs">
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </a>

            <!-- Card 3: Studio Pengurangan Bersusun -->
            <a href="{{ route('pengurangan') }}" class="group relative p-5 sm:p-7 bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 hover:border-rose-500 dark:hover:border-rose-500 active:scale-[0.98] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-5 overflow-hidden">
                <div class="absolute -right-8 -top-8 w-36 h-36 bg-gradient-to-br from-rose-500/10 to-amber-500/10 dark:from-rose-500/20 dark:to-amber-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

                <div class="flex flex-col gap-3.5 relative z-10">
                    <div class="flex items-center justify-between">
                        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 group-hover:scale-110 transition-transform">
                            <i data-lucide="minus" class="w-6 h-6 sm:w-7 sm:h-7"></i>
                        </div>
                        <span class="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 rounded-lg border border-rose-200 dark:border-rose-800">Modul 03</span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <h2 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                            Studio Pengurangan
                        </h2>
                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            Simulasi pengurangan bersusun ke bawah dengan animasi efek blur meminjam puluhan (regrouping) yang interaktif.
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-1.5 pt-1">
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] sm:text-[11px] rounded-lg">Pengurangan Bersusun</span>
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] sm:text-[11px] rounded-lg">Animasi Meminjam</span>
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] sm:text-[11px] rounded-lg">Blur & Corest Morph</span>
                    </div>
                </div>

                <div class="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                    <span class="text-xs font-extrabold text-slate-700 dark:text-slate-300 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Buka Studio Pengurangan</span>
                    <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-rose-600 text-slate-700 dark:text-slate-300 group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1 shadow-2xs">
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </a>

        </div>

    </main>
</x-layout.app>
