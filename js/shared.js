/**
 * Shared Utilities & Header Controls (Math Learning Studio)
 * Manages theme, sound effects, BGM, Lucide icons, and mobile navigation drawer.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    if (typeof window.lucide !== 'undefined') {
        window.lucide.createIcons();
    }

    // 2. Sound Effects & BGM Instances
    if (typeof window.SoundEffects === 'function' && !window.soundFx) {
        window.soundFx = new window.SoundEffects();
    }
    if (typeof window.BGMController === 'function' && !window.bgmPlayer) {
        window.bgmPlayer = new window.BGMController();
    }

    const soundFx = window.soundFx;
    const bgmPlayer = window.bgmPlayer;

    // 3. Theme Toggle Setup
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (soundFx) soundFx.playClick();
            const isDark = document.documentElement.classList.toggle('dark');
            if (isDark) {
                document.documentElement.classList.remove('light');
                localStorage.setItem('math2_theme', 'dark');
            } else {
                document.documentElement.classList.add('light');
                localStorage.setItem('math2_theme', 'light');
            }
        });
    }

    // 4. Sound SFX Toggle
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    if (soundToggleBtn && soundFx) {
        soundToggleBtn.addEventListener('click', () => {
            const enabled = soundFx.toggleSound();
            soundToggleBtn.classList.toggle('opacity-50', !enabled);
        });
    }

    // 5. BGM Music Toggle
    const bgmToggleBtn = document.getElementById('bgmToggleBtn');
    if (bgmToggleBtn && bgmPlayer) {
        bgmToggleBtn.addEventListener('click', () => {
            const isPlaying = bgmPlayer.toggleBGM();
            bgmToggleBtn.classList.toggle('text-indigo-600', isPlaying);
            bgmToggleBtn.classList.toggle('bg-indigo-100', isPlaying);
        });
    }

    // 6. Mobile Hamburger Drawer
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
    const closeMobileDrawerBtn = document.getElementById('closeMobileDrawerBtn');

    if (hamburgerBtn && mobileMenuDrawer) {
        hamburgerBtn.addEventListener('click', () => {
            if (soundFx) soundFx.playClick();
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
