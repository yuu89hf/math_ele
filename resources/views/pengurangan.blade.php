<x-layout.app title="Studio Pengurangan - Visual Pengurangan Bersusun & Teknik Meminjam">
    <!-- Header Navigation Component -->
    <x-header />

    <!-- Mobile Navigation Tabs Component -->
    <x-mobile-tabs />

    <!-- Main Viewport Area Grid -->
    <main class="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 flex-1 h-full min-h-0 overflow-hidden">
        <!-- Control Panel Component (Left lg:col-span-5) -->
        <x-math.pengurangan-control-panel />

        <!-- Visual Canvas Component (Right lg:col-span-7) -->
        <x-math.pengurangan-visual-canvas />
    </main>
</x-layout.app>
