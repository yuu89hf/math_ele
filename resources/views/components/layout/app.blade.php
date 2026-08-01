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
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Comic+Neue:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons & Confetti CDN -->
    <script src="https://unpkg.com/@lucide/web"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>

    <script>
        // Set default theme to Light
        const savedTheme = localStorage.getItem('math2_theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('math2_theme', 'light');
        }
    </script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans h-screen h-[100dvh] overflow-hidden flex flex-col transition-colors duration-300 antialiased selection:bg-indigo-500 selection:text-white">

    <!-- Background Orbs / Gradients -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-200/50 to-purple-200/50 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-amber-200/50 to-indigo-200/50 dark:from-amber-500/10 dark:to-indigo-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Main Full Viewport Screen Container -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-col flex-1 h-full min-h-0 overflow-hidden">
        {{ $slot }}
    </div>

    <!-- Modals & Drawers -->
    {{ $modals ?? '' }}

</body>
</html>
