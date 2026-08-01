/**
 * FPB & KPK Studio Controller Module
 * Interactive visual calculator for FPB (GCD) and KPK (LCM) with 4 methods:
 * 1. Sengkedan Table
 * 2. Prime Factor Tree (Pohon Faktor)
 * 3. Number Line Jump (Garis Bilangan)
 * 4. Venn Diagram
 */

export function initFPBKPKApp() {
    if (typeof window.lucide !== 'undefined') {
        window.lucide.createIcons();
    }

    const dynamicContainer = document.getElementById('dynamicNumbersContainer');
    if (!dynamicContainer) return; // Not on FPB & KPK page

    let numberCount = 2; // 2, 3, 4
    let targetGoal = 'fpb'; // 'fpb', 'kpk', 'both'
    let visualMethod = 'sengkedan'; // 'sengkedan', 'pohon', 'garis', 'venn'
    let currentNumbers = [24, 36];
    let isSfxEnabled = true;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playSFX(freq = 440, type = 'sine', duration = 0.15) {
        if (!isSfxEnabled) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch(e) {}
    }

    // Helper Math Functions
    function getGCD(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) {
            let t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    function getLCM(a, b) {
        if (a === 0 || b === 0) return 0;
        return Math.abs((a * b) / getGCD(a, b));
    }

    function getMultiGCD(arr) {
        return arr.reduce((acc, val) => getGCD(acc, val));
    }

    function getMultiLCM(arr) {
        return arr.reduce((acc, val) => getLCM(acc, val));
    }

    function getPrimeFactors(n) {
        let factors = [];
        let d = 2;
        let temp = n;
        while (temp > 1) {
            while (temp % d === 0) {
                factors.push(d);
                temp /= d;
            }
            d++;
            if (d * d > temp && temp > 1) {
                factors.push(temp);
                break;
            }
        }
        return factors;
    }

    // Render Dynamic Number Inputs
    function renderDynamicInputs() {
        const gridColsMap = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' };
        dynamicContainer.className = `grid ${gridColsMap[numberCount] || 'grid-cols-2'} gap-2 pt-1`;
        dynamicContainer.innerHTML = '';

        const presets = [24, 36, 48, 60];
        const colors = ['text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500', 'text-rose-600 dark:text-rose-400 focus:ring-rose-500', 'text-emerald-600 dark:text-emerald-400 focus:ring-emerald-500', 'text-amber-600 dark:text-amber-400 focus:ring-amber-500'];

        for (let i = 0; i < numberCount; i++) {
            const val = currentNumbers[i] || presets[i];
            const colorClass = colors[i % colors.length];

            const wrapper = document.createElement('div');
            wrapper.className = "flex flex-col gap-0.5";
            wrapper.innerHTML = `
                <label for="numInput_${i}" class="text-[10px] font-extrabold uppercase text-slate-400">Angka #${i+1}</label>
                <input type="number" id="numInput_${i}" value="${val}" min="2" max="999" step="1" pattern="[0-9]*" inputmode="numeric" 
                       class="fpb-num-input w-full p-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-sm font-bold text-center ${colorClass} outline-none focus:ring-2 shadow-xs" required>
            `;
            dynamicContainer.appendChild(wrapper);
        }

        document.querySelectorAll('.fpb-num-input').forEach(input => {
            input.addEventListener('input', runCalculator);
            input.addEventListener('change', runCalculator);
        });
    }

    function readInputs() {
        let nums = [];
        for (let i = 0; i < numberCount; i++) {
            const el = document.getElementById(`numInput_${i}`);
            let val = el ? parseInt(el.value, 10) : 24;
            if (isNaN(val) || val < 2) val = 2;
            nums.push(val);
        }
        currentNumbers = nums;
        return nums;
    }

    function runCalculator() {
        const nums = readInputs();
        const gcdVal = getMultiGCD(nums);
        const lcmVal = getMultiLCM(nums);

        const summaryBadgeEl = document.getElementById('summaryBadge');
        if (summaryBadgeEl) {
            summaryBadgeEl.innerHTML = `
                <span class="px-2 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg font-mono">FPB: <strong>${gcdVal}</strong></span>
                <span class="px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg font-mono">KPK: <strong>${lcmVal}</strong></span>
            `;
        }

        renderVisualCanvas(nums, gcdVal, lcmVal);
    }

    function renderVisualCanvas(nums, gcdVal, lcmVal) {
        const canvasContainer = document.getElementById('visualCanvasOutput');
        if (!canvasContainer) return;

        if (visualMethod === 'sengkedan') {
            renderSengkedan(canvasContainer, nums, gcdVal, lcmVal);
        } else if (visualMethod === 'pohon') {
            renderPohonFaktor(canvasContainer, nums);
        } else if (visualMethod === 'garis') {
            renderGarisBilangan(canvasContainer, nums, lcmVal);
        } else if (visualMethod === 'venn') {
            renderVennDiagram(canvasContainer, nums, gcdVal, lcmVal);
        }
    }

    // Method 1: Sengkedan Table
    function renderSengkedan(container, nums, gcdVal, lcmVal) {
        let current = [...nums];
        let steps = [];
        let prime = 2;

        while (current.some(n => n > 1)) {
            let divides = current.map(n => n % prime === 0);
            if (divides.some(d => d)) {
                let isShared = divides.every(d => d);
                let next = current.map((n, idx) => divides[idx] ? n / prime : n);
                steps.push({
                    prime,
                    divides,
                    isShared,
                    oldState: [...current],
                    newState: [...next]
                });
                current = next;
            } else {
                prime++;
            }
        }

        let tableHeader = nums.map((_, i) => `<th class="p-2 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-center font-mono font-extrabold text-xs">Angka #${i+1}</th>`).join('');

        let rowsHtml = steps.map((s, idx) => {
            let sharedBadge = s.isShared 
                ? `<span class="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold rounded text-[10px]">Pembagi Bersama (FPB)</span>` 
                : '';

            let numCols = s.oldState.map((val, i) => {
                let changed = s.divides[i];
                return `<td class="p-2 border border-slate-300 dark:border-slate-700 text-center font-mono font-bold text-sm ${changed ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : 'text-slate-400'}">${s.newState[i]}</td>`;
            }).join('');

            return `
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td class="p-2 border border-slate-300 dark:border-slate-700 text-center font-mono font-extrabold text-sm text-purple-600 dark:text-purple-400">${s.prime} ${sharedBadge}</td>
                    ${numCols}
                </tr>
            `;
        }).join('');

        container.innerHTML = `
            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <i data-lucide="grid" class="w-4 h-4 text-indigo-500"></i> Tabel Sengkedan (Pembagian Bersama)
                    </h3>
                </div>
                <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th class="p-2 border border-slate-300 dark:border-slate-700 bg-indigo-50 dark:bg-indigo-950/40 text-center font-mono font-extrabold text-xs text-indigo-600 dark:text-indigo-400">Prima</th>
                                ${tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="p-2 border border-slate-300 dark:border-slate-700 text-center font-mono font-bold text-xs text-slate-400">Awal</td>
                                ${nums.map(n => `<td class="p-2 border border-slate-300 dark:border-slate-700 text-center font-mono font-extrabold text-sm">${n}</td>`).join('')}
                            </tr>
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>
                <div class="p-3 bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 rounded-xl flex flex-col gap-1 text-xs">
                    <span class="font-extrabold text-indigo-600 dark:text-indigo-400">Kesimpulan Sengkedan:</span>
                    <div>• <strong>FPB:</strong> Perkalian pembagi yang bisa membagi semua angka = <span class="font-mono font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">${gcdVal}</span></div>
                    <div>• <strong>KPK:</strong> Perkalian seluruh faktor prima dari atas sampai 1 = <span class="font-mono font-extrabold text-purple-600 dark:text-purple-400 text-sm">${lcmVal}</span></div>
                </div>
            </div>
        `;
        if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
    }

    // Method 2: Pohon Faktor (Factor Trees)
    function renderPohonFaktor(container, nums) {
        let treesHtml = nums.map((num, i) => {
            let factors = getPrimeFactors(num);
            let factorCounts = {};
            factors.forEach(f => factorCounts[f] = (factorCounts[f] || 0) + 1);
            let expStr = Object.entries(factorCounts).map(([p, exp]) => exp > 1 ? `${p}<sup>${exp}</sup>` : `${p}`).join(' × ');

            return `
                <div class="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center gap-2 shadow-xs">
                    <span class="text-xs font-extrabold text-slate-500 uppercase">Pohon Faktor #${i+1}</span>
                    <div class="w-12 h-12 rounded-full bg-indigo-600 text-white font-mono font-extrabold text-lg flex items-center justify-center shadow-md">
                        ${num}
                    </div>
                    <div class="flex items-center gap-1 flex-wrap justify-center pt-2">
                        ${factors.map(f => `<span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg font-mono font-bold text-xs">${f}</span>`).join(' × ')}
                    </div>
                    <div class="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-bold pt-1">
                        ${num} = ${expStr}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="flex flex-col gap-3">
                <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <i data-lucide="git-fork" class="w-4 h-4 text-emerald-500"></i> Faktorisasi Prima (Pohon Faktor)
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${treesHtml}
                </div>
            </div>
        `;
        if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
    }

    // Method 3: Garis Bilangan / Lompatan KPK
    function renderGarisBilangan(container, nums, lcmVal) {
        let maxJump = Math.min(lcmVal * 2, 60);
        let jumpsHtml = nums.map((num, idx) => {
            let jumps = [];
            for (let j = num; j <= maxJump; j += num) jumps.push(j);
            return `
                <div class="flex flex-col gap-1">
                    <span class="text-xs font-extrabold text-slate-600 dark:text-slate-300">Lompatan Angka ${num}:</span>
                    <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
                        ${jumps.map(j => {
                            const isLCM = j === lcmVal;
                            return `<span class="px-2.5 py-1 ${isLCM ? 'bg-purple-600 text-white shadow-md scale-110 font-extrabold' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold'} rounded-lg font-mono text-xs shrink-0">${j}</span>`;
                        }).join(' → ')}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="flex flex-col gap-3">
                <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <i data-lucide="trending-up" class="w-4 h-4 text-purple-500"></i> Lompatan Kelipatan (KPK)
                </h3>
                <div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col gap-3">
                    ${jumpsHtml}
                    <div class="p-2.5 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-lg text-xs font-bold text-purple-600 dark:text-purple-400">
                        🎯 Kelipatan Persekutuan Terkecil (KPK) adalah angka lompatan pertama yang bertemu di semua baris = <span class="font-mono text-sm underline">${lcmVal}</span>
                    </div>
                </div>
            </div>
        `;
        if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
    }

    // Method 4: Venn Diagram
    function renderVennDiagram(container, nums, gcdVal, lcmVal) {
        container.innerHTML = `
            <div class="flex flex-col gap-3">
                <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <i data-lucide="pie-chart" class="w-4 h-4 text-amber-500"></i> Diagram Venn Faktor Persekutuan
                </h3>
                <div class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center gap-4">
                    <div class="relative w-64 h-40 flex items-center justify-center">
                        <div class="absolute left-4 w-36 h-36 rounded-full bg-indigo-500/20 border-2 border-indigo-500 flex items-center justify-start pl-4 font-extrabold text-indigo-600">
                            #1
                        </div>
                        <div class="absolute right-4 w-36 h-36 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-end pr-4 font-extrabold text-rose-600">
                            #2
                        </div>
                        <div class="z-10 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl shadow-lg border border-purple-500 font-mono font-extrabold text-purple-600 text-sm text-center">
                            Irisan (FPB)<br>
                            <span class="text-lg text-purple-600 dark:text-purple-400">${gcdVal}</span>
                        </div>
                    </div>
                    <div class="text-center text-xs text-slate-600 dark:text-slate-400 font-bold">
                        Irisan lingkaran menunjukkan FPB = <strong class="text-purple-600">${gcdVal}</strong>, dan gabungan seluruh wilayah memberikan KPK = <strong class="text-indigo-600">${lcmVal}</strong>.
                    </div>
                </div>
            </div>
        `;
        if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
    }

    // Button event listeners
    for (let c = 2; c <= 4; c++) {
        const btn = document.getElementById(`count-btn-${c}`);
        if (btn) {
            btn.addEventListener('click', () => {
                playSFX(440);
                numberCount = c;
                for (let k = 2; k <= 4; k++) {
                    const b = document.getElementById(`count-btn-${k}`);
                    if (b) {
                        b.className = k === c
                            ? "count-btn py-1 px-2.5 rounded-lg text-xs font-extrabold bg-indigo-600 text-white shadow-xs border border-indigo-500"
                            : "count-btn py-1 px-2.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700";
                    }
                }
                renderDynamicInputs();
                runCalculator();
            });
        }
    }

    ['sengkedan', 'pohon', 'garis', 'venn'].forEach(m => {
        const btn = document.getElementById(`method-btn-${m}`);
        if (btn) {
            btn.addEventListener('click', () => {
                playSFX(520);
                visualMethod = m;
                ['sengkedan', 'pohon', 'garis', 'venn'].forEach(k => {
                    const b = document.getElementById(`method-btn-${k}`);
                    if (b) {
                        b.className = k === m
                            ? "method-btn py-1 px-2.5 rounded-lg text-xs font-extrabold bg-indigo-600 text-white shadow-xs border border-indigo-500"
                            : "method-btn py-1 px-2.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700";
                    }
                });
                runCalculator();
            });
        }
    });

    renderDynamicInputs();
    runCalculator();
}
