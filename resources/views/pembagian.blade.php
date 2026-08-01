<x-layout.app title="Studio Pembagian - Visual Math Division">
    <!-- Header Navigation Component -->
    <x-header />

    <!-- Mobile Navigation Tabs Component -->
    <x-mobile-tabs />

    <!-- Main Viewport Area -->
    <main class="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 flex-1 h-full min-h-0 overflow-hidden">
        <!-- Control Panel & Input Component -->
        <x-math.math2-control-panel />

        <!-- Visual Canvas Component -->
        <x-math.math2-visual-canvas />
    </main>

    <!-- Modals -->
    <x-slot:modals>
        <x-modal.victory />
    </x-slot:modals>
</x-layout.app>
