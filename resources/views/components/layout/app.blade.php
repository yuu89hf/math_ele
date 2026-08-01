<!DOCTYPE html>
<html lang="id" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Math Learning Studio - Visual FPB, KPK & Pembagian Interaktif' }}</title>
    <meta name="description" content="Aplikasi Belajar Matematika Interaktif FPB, KPK, dan Pembagian Porogapit dengan BGM Music Player & Visualisasi Animasi.">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@400;600;700;800&family=Instrument+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons & Confetti CDN -->
    <script src="https://unpkg.com/@lucide/web"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>

    <script>
        if (localStorage.getItem('math2_theme') === 'dark' || (!('math2_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    </script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans h-screen h-[100dvh] overflow-hidden flex flex-col transition-colors duration-300 antialiased">

    <!-- Background Orbs -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
    </div>

    <!-- Main Full Viewport Screen Container -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-6 py-2 flex flex-col flex-1 h-full min-h-0 overflow-hidden">
        {{ $slot }}
    </div>

    <!-- Modals & Drawers -->
    {{ $modals ?? '' }}

</body>
</html>
