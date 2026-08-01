/**
 * FPB & KPK Studio Controller Module
 * Interactive visual calculator for FPB (GCD) and KPK (LCM) with 4 methods:
 * 1. Sengkedan Table
 * 2. Prime Factor Tree (Pohon Faktor)
 * 3. Number Line Jump (Garis Bilangan)
 * 4. SVG Venn Diagram
 */

export function initFPBKPKApp() {
    if (typeof window.lucide !== 'undefined') {
        window.lucide.createIcons();
    }

    const dynamicContainer = document.getElementById('dynamicNumbersContainer');
    if (!dynamicContainer) return; // Not on FPB & KPK page

    let numberCount = 2; // 2, 3, 4
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
        dynamicContainer.className = `grid ${gridColsMap[numberCount] || 'grid-cols-2'} gap-2.5 pt-1`;
        dynamicContainer.innerHTML = '';

        const presets = [24, 36, 48, 60];
        const colors = [
            'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500', 
            'text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 focus:ring-rose-500', 
            'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 focus:ring-emerald-500', 
            'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 focus:ring-amber-500'
        ];

        for (let i = 0; i < numberCount; i++) {
            const val = currentNumbers[i] || presets[i];
            const colorClass = colors[i % colors.length];

            const wrapper = document.createElement('div');
            wrapper.className = "flex flex-col gap-1";
            wrapper.innerHTML = `
                <label for="numInput_${i}" class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Angka #${i+1}</label>
                <input type="number" id="numInput_${i}" value="${val}" min="2" max="999" step="1" pattern="[0-9]*" inputmode="numeric" 
                       class="fpb-num-input w-full p-2.5 bg-white dark:bg-slate-800 border-2 rounded-xl font-mono text-base font-bold text-center ${colorClass} outline-none focus:ring-2 shadow-xs transition" required>
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
                <div class="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-xl text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold shadow-xs">
                    <span>FPB:</span> <strong class="text-indigo-600 dark:text-indigo-400 text-sm">${gcdVal}</strong>
                </div>
                <div class="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl text-purple-700 dark:text-purple-300 font-mono text-xs font-bold shadow-xs">
                    <span>KPK:</span> <strong class="text-purple-600 dark:text-purple-400 text-sm">${lcmVal}</strong>
                </div>
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

        let tableHeader = nums.map((_, i) => `<th class="p-3 border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 text-center font-mono font-extrabold text-xs text-slate-700 dark:text-slate-300">Angka #${i+1}</th>`).join('');

        let rowsHtml = steps.map((s, idx) => {
            let sharedBadge = s.isShared 
                ? `<span class="ml-1.5 px-2 py-0.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-extrabold rounded-md text-[10px]">FPB</span>` 
                : '';

            let numCols = s.oldState.map((val, i) => {
                let changed = s.divides[i];
                return `<td class="p-3 border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-sm ${changed ? 'text-indigo-600 dark:text-indigo-400 font-extrabold bg-indigo-50/40 dark:bg-indigo-950/20' : 'text-slate-400'}">${s.newState[i]}</td>`;
            }).join('');

            return `
                <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition">
                    <td class="p-3 border border-slate-200 dark:border-slate-800 text-center font-mono font-extrabold text-sm text-purple-600 dark:text-purple-400 bg-purple-50/30 dark:bg-purple-950/20">
                        ${s.prime} ${sharedBadge}
                    </td>
                    ${numCols}
                </tr>
            `;
        }).join('');

        container.innerHTML = `
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <div class="p-1.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg">
                            <i data-lucide="grid" class="w-4 h-4"></i>
                        </div>
                        <span>Tabel Sengkedan (Pembagian Bersama)</span>
                    </h3>
                </div>

                <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th class="p-3 border border-slate-200 dark:border-slate-800 bg-indigo-50 dark:bg-indigo-950/60 text-center font-mono font-extrabold text-xs text-indigo-700 dark:text-indigo-300">Pembagi Prima</th>
                                ${tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="p-3 border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/40">Nilai Awal</td>
                                ${nums.map(n => `<td class="p-3 border border-slate-200 dark:border-slate-800 text-center font-mono font-extrabold text-sm text-slate-900 dark:text-white">${n}</td>`).join('')}
                            </tr>
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>

                <div class="p-4 bg-gradient-to-r from-indigo-50 via-slate-50 to-purple-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-2xl flex flex-col gap-2 shadow-xs">
                    <span class="font-extrabold text-xs text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                        <i data-lucide="info" class="w-4 h-4 text-indigo-500"></i> Kesimpulan Tabel Sengkedan:
                    </span>
                    <div class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
                        <div>• <strong>FPB:</strong> Perkalian pembagi prima yang membagi <em>seluruh angka sekaligus</em> (berlabel FPB) = <span class="font-mono font-extrabold text-indigo-600 dark:text-indigo-400 text-sm px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/60 rounded-md">${gcdVal}</span></div>
                        <div>• <strong>KPK:</strong> Perkalian <em>seluruh pembagi prima</em> dari baris awal sampai menghasilkan 1 = <span class="font-mono font-extrabold text-purple-600 dark:text-purple-400 text-sm px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/60 rounded-md">${lcmVal}</span></div>
                    </div>
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
                <div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition">
                    <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Pohon Faktor #${i+1}</span>
                    
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-mono font-extrabold text-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        ${num}
                    </div>

                    <div class="flex items-center justify-center gap-1.5 flex-wrap pt-2 border-t border-slate-100 dark:border-slate-800 w-full">
                        <span class="text-xs text-slate-500 font-bold">Faktor Prima:</span>
                        ${factors.map(f => `<span class="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-lg font-mono font-extrabold text-xs shadow-2xs">${f}</span>`).join(' × ')}
                    </div>

                    <div class="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center w-full">
                        <span class="text-[11px] font-bold text-slate-500">Bentuk Faktorisasi:</span>
                        <div class="font-mono font-extrabold text-slate-800 dark:text-slate-100 text-sm pt-0.5">
                            ${num} = ${expStr}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="flex flex-col gap-4">
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <div class="p-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg">
                        <i data-lucide="git-fork" class="w-4 h-4"></i>
                    </div>
                    <span>Faktorisasi Prima (Pohon Faktor)</span>
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div class="flex flex-col gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <span class="text-xs font-bold text-slate-700 dark:text-slate-300">Lompatan Kelipatan ${num}:</span>
                    <div class="flex items-center gap-2 overflow-x-auto pb-1">
                        ${jumps.map(j => {
                            const isLCM = j === lcmVal;
                            return `<span class="px-3 py-1.5 ${isLCM ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30 scale-105 font-extrabold ring-2 ring-purple-300' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-800'} rounded-xl font-mono text-xs shrink-0 transition">${j}</span>`;
                        }).join('<i data-lucide="arrow-right" class="w-3.5 h-3.5 text-slate-300 shrink-0"></i>')}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="flex flex-col gap-4">
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <div class="p-1.5 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-lg">
                        <i data-lucide="trending-up" class="w-4 h-4"></i>
                    </div>
                    <span>Lompatan Kelipatan (KPK)</span>
                </h3>
                <div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col gap-3 shadow-sm">
                    ${jumpsHtml}
                    <div class="p-3 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                        <i data-lucide="target" class="w-4 h-4 text-purple-500 shrink-0"></i>
                        <span>KPK adalah angka lompatan pertama yang bertemu di semua deret = <strong class="font-mono text-sm underline">${lcmVal}</strong></span>
                    </div>
                </div>
            </div>
        `;
        if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
    }

    // Method 4: High-End SVG Venn Diagram
    function renderVennDiagram(container, nums, gcdVal, lcmVal) {
        container.innerHTML = `
            <div class="flex flex-col gap-4">
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <div class="p-1.5 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-lg">
                        <i data-lucide="pie-chart" class="w-4 h-4"></i>
                    </div>
                    <span>Diagram Venn Faktor Persekutuan</span>
                </h3>
                <div class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-6 shadow-sm">
                    
                    <!-- SVG Diagram Venn Overlapping Set -->
                    <div class="relative w-full max-w-sm h-48 flex items-center justify-center">
                        <svg viewBox="0 0 400 200" class="w-full h-full">
                            <!-- Left Circle (Set A) -->
                            <circle cx="150" cy="100" r="85" fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" stroke-width="3" />
                            <!-- Right Circle (Set B) -->
                            <circle cx="250" cy="100" r="85" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" stroke-width="3" />
                            
                            <!-- Labels -->
                            <text x="100" y="95" font-size="14" font-weight="800" fill="#4f46e5" text-anchor="middle">Angka #${nums[0]}</text>
                            <text x="100" y="115" font-size="16" font-weight="800" fill="#1e293b" text-anchor="middle">${nums[0]}</text>

                            <text x="300" y="95" font-size="14" font-weight="800" fill="#e11d48" text-anchor="middle">Angka #${nums[1] || nums[0]}</text>
                            <text x="300" y="115" font-size="16" font-weight="800" fill="#1e293b" text-anchor="middle">${nums[1] || nums[0]}</text>

                            <!-- Intersection FPB -->
                            <text x="200" y="90" font-size="12" font-weight="800" fill="#9333ea" text-anchor="middle">Irisan (FPB)</text>
                            <text x="200" y="118" font-size="22" font-weight="900" fill="#7e22ce" text-anchor="middle">${gcdVal}</text>
                        </svg>
                    </div>

                    <div class="grid grid-cols-2 gap-3 w-full max-w-sm">
                        <div class="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-xl text-center flex flex-col">
                            <span class="text-[10px] font-extrabold uppercase text-indigo-500">Irisan (FPB)</span>
                            <span class="font-mono text-lg font-extrabold text-indigo-700 dark:text-indigo-300">${gcdVal}</span>
                        </div>
                        <div class="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl text-center flex flex-col">
                            <span class="text-[10px] font-extrabold uppercase text-purple-500">Gabungan (KPK)</span>
                            <span class="font-mono text-lg font-extrabold text-purple-700 dark:text-purple-300">${lcmVal}</span>
                        </div>
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
                            ? "count-btn py-1.5 px-3 rounded-xl text-xs font-extrabold bg-indigo-600 text-white shadow-xs border border-indigo-500 transition cursor-pointer"
                            : "count-btn py-1.5 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition cursor-pointer hover:bg-slate-50";
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
                            ? "method-btn py-2 px-3 rounded-xl text-xs font-extrabold bg-indigo-600 text-white shadow-xs border border-indigo-500 transition flex items-center justify-center gap-1.5 cursor-pointer"
                            : "method-btn py-2 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50";
                    }
                });
                runCalculator();
            });
        }
    });

    renderDynamicInputs();
    runCalculator();
}
