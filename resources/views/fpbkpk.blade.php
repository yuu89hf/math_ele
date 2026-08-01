<x-layout.app title="FPB & KPK Studio - Ideal Visual Math & Solver">
    <!-- Header Navigation -->
    <x-header />

    <!-- Main Viewport Area Grid -->
    <main class="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 flex-1 h-full min-h-0 overflow-hidden">
        <!-- Control Panel Component (Left lg:col-span-5) -->
        <x-math.fpbkpk-control-panel />

        <!-- Visual Canvas Component (Right lg:col-span-7) -->
        <x-math.fpbkpk-visual-canvas />
    </main>
</x-layout.app>
