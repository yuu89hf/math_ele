<x-layout.app title="Math Learning Studio - Pilih Studio Pembelajaran">
    <!-- Top Navigation Header -->
    <x-header />

    <!-- Welcome Selection Viewport Container -->
    <main class="flex-1 flex flex-col justify-center items-center gap-6 sm:gap-8 p-4 sm:p-8 overflow-y-auto h-full min-h-0">
        
        <!-- Hero Section -->
        <div class="text-center max-w-2xl flex flex-col gap-2.5">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold rounded-full self-center border border-indigo-200 dark:border-indigo-800 shadow-xs">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-500"></i> Platform Matematika SD Interaktif
            </span>
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Pilih Studio Pembelajaran
            </h1>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
                Pilih modul materi matematika interaktif yang ingin dipelajari hari ini. Tanpa database, tanpa skor, dan 100% cepat & interaktif!
            </p>
        </div>

        <!-- Tool Selection Grid (FPB & KPK vs Studio Pembagian) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
            
            <!-- Card 1: FPB & KPK Studio -->
            <a href="{{ route('fpbkpk') }}" class="group relative p-6 sm:p-7 bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6 overflow-hidden">
                <div class="absolute -right-8 -top-8 w-36 h-36 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                
                <div class="flex flex-col gap-4 relative z-10">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform">
                        <i data-lucide="sparkles" class="w-7 h-7"></i>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <span class="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Modul 01</span>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            Studio FPB & KPK
                        </h2>
                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            Visualisasikan Faktor Persekutuan Terbesar dan Kelipatan Persekutuan Terkecil dengan 4 metode visual: Sengkedan, Pohon Faktor, Garis Bilangan, dan Diagram Venn.
                        </p>
                    </div>

                    <!-- Feature Badges -->
                    <div class="flex flex-wrap gap-1.5 pt-1">
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold text-[11px] rounded-lg">Tabel Sengkedan</span>
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold text-[11px] rounded-lg">Pohon Faktor</span>
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold text-[11px] rounded-lg">Diagram Venn</span>
                    </div>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                    <span class="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Buka Studio FPB & KPK</span>
                    <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 text-slate-700 dark:text-slate-300 group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1">
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </a>

            <!-- Card 2: Studio Pembagian Porogapit -->
            <a href="{{ route('pembagian') }}" class="group relative p-6 sm:p-7 bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6 overflow-hidden">
                <div class="absolute -right-8 -top-8 w-36 h-36 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

                <div class="flex flex-col gap-4 relative z-10">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
                        <i data-lucide="divide" class="w-7 h-7"></i>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <span class="text-[11px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">Modul 02</span>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            Studio Pembagian
                        </h2>
                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            Belajar pembagian bersusun (porogapit) dengan panduan interaktif langkah demi langkah atau simulasi animasi otomatis pada papan tulis digital.
                        </p>
                    </div>

                    <!-- Feature Badges -->
                    <div class="flex flex-wrap gap-1.5 pt-1">
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold text-[11px] rounded-lg">Porogapit Visual</span>
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold text-[11px] rounded-lg">Modus Interaktif</span>
                        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold text-[11px] rounded-lg">Animasi Otomatis</span>
                    </div>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                    <span class="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Buka Studio Pembagian</span>
                    <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-purple-600 text-slate-700 dark:text-slate-300 group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1">
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </a>

        </div>

    </main>
</x-layout.app>
