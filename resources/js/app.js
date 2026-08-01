import './bootstrap';
import { initMath2App } from './math2/math2App.js';
import { initFPBKPKApp } from './fpbkpk/fpbkpkApp.js';
import { initPenguranganApp } from './pengurangan/penguranganApp.js';

document.addEventListener('DOMContentLoaded', () => {
    initMath2App();
    initFPBKPKApp();
    initPenguranganApp();
});
