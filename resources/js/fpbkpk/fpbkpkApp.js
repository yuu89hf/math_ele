/**
 * FPB & KPK Studio Controller Module
 * Pure Pohon Faktor (Factor Tree) Method for PC & Mobile
 * Tight, compact, & neat branching tree spacing
 */

export function initFPBKPKApp() {
    if (typeof window.lucide !== 'undefined') {
        window.lucide.createIcons();
    }

    const dynamicContainer = document.getElementById('dynamicNumbersContainer');
    if (!dynamicContainer) return; // Not on FPB & KPK page

    let numberCount = 2; // 2, 3, 4
    let targetGoal = 'fpb'; // 'fpb' or 'kpk' only
    let visualMethod = 'pohon'; // Locked to Pohon Faktor
    let currentNumbers = [24, 36];
    let isSfxEnabled = true;
    let activeMobileTab = 'control'; // Default starts at Kontrol & Soal on Mobile

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const panelControlSection = document.getElementById('fpbControlSection');
    const panelCanvasSection = document.getElementById('fpbCanvasSection');
    const mobileTabControl = document.getElementById('mobileTabControl');
    const mobileTabPaper = document.getElementById('mobileTabPaper');
    const rightViewSwitcherBtn = document.getElementById('rightViewSwitcherBtn');
    const rightViewText = document.getElementById('rightViewText');

    function setMobileView(view) {
        activeMobileTab = view;
        const isMobile = window.innerWidth < 1024;

        if (!isMobile) {
            if (panelControlSection) panelControlSection.classList.remove('hidden');
            if (panelCanvasSection) panelCanvasSection.classList.remove('hidden');
            return;
        }

        if (view === 'control') {
            if (panelControlSection) panelControlSection.classList.remove('hidden');
            if (panelCanvasSection) panelCanvasSection.classList.add('hidden');
            
            if (mobileTabControl) mobileTabControl.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (mobileTabPaper) mobileTabPaper.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (rightViewText) rightViewText.textContent = "Papan";
        } else {
            if (panelControlSection) panelControlSection.classList.add('hidden');
            if (panelCanvasSection) panelCanvasSection.classList.remove('hidden');
            
            if (mobileTabPaper) mobileTabPaper.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (mobileTabControl) mobileTabControl.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer";
            if (rightViewText) rightViewText.textContent = "Kontrol";
        }
    }

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

    function getSmallestPrimeFactor(n) {
        if (n <= 1) return n;
        for (let d = 2; d * d <= n; d++) {
            if (n % d === 0) return d;
        }
        return n;
    }

    function getPrimeFactors(n) {
        let factors = [];
        let temp = n;
        while (temp > 1) {
            let p = getSmallestPrimeFactor(temp);
            factors.push(p);
            temp /= p;
        }
        return factors;
    }

    function getPrimeCounts(n) {
        let factors = getPrimeFactors(n);
        let counts = {};
        factors.forEach(f => counts[f] = (counts[f] || 0) + 1);
        return counts;
    }

    // Build Recursive Factor Tree Data Structure
    function buildTreeData(n) {
        let p = getSmallestPrimeFactor(n);
        if (p === n) {
            return { value: n, isPrime: true };
        }
        return {
            value: n,
            isPrime: false,
            left: { value: p, isPrime: true },
            right: buildTreeData(n / p)
        };
    }

    // Render Dynamic Number Inputs
    function renderDynamicInputs() {
        const gridColsMap = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' };
        dynamicContainer.className = `grid ${gridColsMap[numberCount] || 'grid-cols-2'} gap-2 sm:gap-2.5 pt-1`;
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
                <label for="numInput_${i}" class="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Angka #${i+1}</label>
                <input type="number" id="numInput_${i}" value="${val}" min="2" max="999" step="1" pattern="[0-9]*" inputmode="numeric" 
                       class="fpb-num-input w-full p-2 sm:p-2.5 bg-white dark:bg-slate-800 border-2 rounded-xl font-mono text-sm sm:text-base font-bold text-center ${colorClass} outline-none focus:ring-2 shadow-xs transition" required>
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
            let html = '';
            if (targetGoal === 'fpb') {
                html = `
                    <div class="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold shadow-xs">
                        <span>Hasil FPB:</span> <strong class="text-emerald-600 dark:text-emerald-400 text-sm sm:text-base font-black">${gcdVal}</strong>
                    </div>
                `;
            } else {
                html = `
                    <div class="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl text-purple-800 dark:text-purple-300 font-mono text-xs font-bold shadow-xs">
                        <span>Hasil KPK:</span> <strong class="text-purple-600 dark:text-purple-400 text-sm sm:text-base font-black">${lcmVal}</strong>
                    </div>
                `;
            }
            summaryBadgeEl.innerHTML = html;
        }

        renderVisualCanvas(nums, gcdVal, lcmVal);
    }

    function renderVisualCanvas(nums, gcdVal, lcmVal) {
        const canvasContainer = document.getElementById('visualCanvasOutput');
        if (!canvasContainer) return;
        renderPohonFaktor(canvasContainer, nums, gcdVal, lcmVal);
    }

    // High-End Compact Branching Factor Tree Visualizer
    function renderPohonFaktor(container, nums, gcdVal, lcmVal) {
        const numPrimeCounts = nums.map(n => getPrimeCounts(n));
        const allPrimes = [...new Set(nums.flatMap(n => getPrimeFactors(n)))].sort((a, b) => a - b);
        
        let fpbPrimeCounts = {};
        let kpkPrimeCounts = {};

        allPrimes.forEach(p => {
            let counts = numPrimeCounts.map(c => c[p] || 0);
            fpbPrimeCounts[p] = Math.min(...counts);
            kpkPrimeCounts[p] = Math.max(...counts);
        });

        // Determine winning number index for each prime
        let winnerNumIndexMap = {};
        allPrimes.forEach(p => {
            if (targetGoal === 'fpb') {
                const targetExp = fpbPrimeCounts[p];
                if (targetExp > 0) {
                    for (let idx = 0; idx < nums.length; idx++) {
                        if (numPrimeCounts[idx][p] === targetExp) {
                            winnerNumIndexMap[p] = idx;
                            break;
                        }
                    }
                }
            } else {
                const targetExp = kpkPrimeCounts[p];
                for (let idx = 0; idx < nums.length; idx++) {
                    if (numPrimeCounts[idx][p] === targetExp) {
                        winnerNumIndexMap[p] = idx;
                        break;
                    }
                }
            }
        });

        // Helper to render tight compact tree node recursively
        function renderNodeHtml(treeNode, primeOccurrenceTracker, numIndex) {
            if (treeNode.isPrime) {
                const prime = treeNode.value;
                primeOccurrenceTracker[prime] = (primeOccurrenceTracker[prime] || 0) + 1;
                const occ = primeOccurrenceTracker[prime];

                const isWinnerNumber = winnerNumIndexMap[prime] === numIndex;
                const isFPB = targetGoal === 'fpb' && isWinnerNumber && occ <= (fpbPrimeCounts[prime] || 0);
                const isKPK = targetGoal === 'kpk' && isWinnerNumber && occ <= (kpkPrimeCounts[prime] || 0);

                let badgeColor = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';

                if (isFPB) {
                    badgeColor = 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-300 font-black';
                } else if (isKPK) {
                    badgeColor = 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/30 ring-2 ring-purple-300 font-black';
                }

                return `
                    <div class="flex flex-col items-center shrink-0">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-mono font-black text-sm sm:text-base transition ${badgeColor}">
                            ${prime}
                        </div>
                    </div>
                `;
            }

            return `
                <div class="flex flex-col items-center gap-0.5 shrink-0">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-indigo-400 text-indigo-700 dark:text-indigo-300 font-mono font-black text-sm sm:text-base flex items-center justify-center shadow-xs">
                        ${treeNode.value}
                    </div>

                    <div class="flex items-center justify-between w-full max-w-[48px] sm:max-w-[56px] text-slate-400 font-mono text-[10px] sm:text-[12px] leading-none my-0.5 px-1">
                        <span>↙</span>
                        <span>↘</span>
                    </div>

                    <div class="flex items-start justify-center gap-1 sm:gap-1.5">
                        <div class="flex flex-col items-center">
                            ${renderNodeHtml(treeNode.left, primeOccurrenceTracker, numIndex)}
                        </div>
                        <div class="flex flex-col items-center">
                            ${renderNodeHtml(treeNode.right, primeOccurrenceTracker, numIndex)}
                        </div>
                    </div>
                </div>
            `;
        }

        let treesHtml = nums.map((num, i) => {
            let treeData = buildTreeData(num);
            let primeOccurrenceTracker = {};

            let factors = getPrimeFactors(num);
            let pCounts = getPrimeCounts(num);

            let fullExpansionStr = factors.join(' × ');

            let expTermsHtml = Object.entries(pCounts).map(([primeStr, count]) => {
                const prime = parseInt(primeStr, 10);
                const expText = count > 1 ? `<sup>${count}</sup>` : '';
                const isWinnerForPrime = winnerNumIndexMap[prime] === i;

                if (targetGoal === 'fpb' && isWinnerForPrime && fpbPrimeCounts[prime] > 0) {
                    return `<span class="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-emerald-500 text-white rounded-lg sm:rounded-xl font-mono font-black shadow-md ring-2 ring-emerald-300">${prime}${expText}</span>`;
                } else if (targetGoal === 'kpk' && isWinnerForPrime) {
                    return `<span class="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-purple-600 text-white rounded-lg sm:rounded-xl font-mono font-black shadow-md ring-2 ring-purple-300">${prime}${expText}</span>`;
                }

                return `<span class="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md sm:rounded-lg font-mono font-bold">${prime}${expText}</span>`;
            }).join(' × ');

            let treeVisualHtml = renderNodeHtml(treeData, primeOccurrenceTracker, i);

            return `
                <div class="p-3.5 sm:p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl flex flex-col items-center gap-3 sm:gap-4 shadow-sm hover:shadow-md transition">
                    <div class="flex items-center justify-between w-full pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span class="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Pohon Faktor #${i+1}</span>
                        <span class="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
                            N = ${num}
                        </span>
                    </div>
                    
                    <!-- Authentic Visual Branching Tree Structure (Tight & Compact Spacing) -->
                    <div class="w-full flex justify-center py-2 overflow-x-auto">
                        ${treeVisualHtml}
                    </div>

                    <!-- Full Factorization Formula Breakdown -->
                    <div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl sm:rounded-2xl text-center w-full border border-slate-200/80 dark:border-slate-700/80 flex flex-col gap-1.5">
                        <div class="text-[10px] sm:text-[11px] font-bold text-slate-500">
                            Faktorisasi Prima (Perkalian):
                            <div class="font-mono font-extrabold text-slate-800 dark:text-slate-200 text-xs sm:text-sm pt-0.5">
                                ${num} = ${fullExpansionStr}
                            </div>
                        </div>

                        <div class="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                            <span class="text-[9px] sm:text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Bentuk Eksponen:</span>
                            <div class="font-mono text-xs sm:text-base flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
                                <span class="font-extrabold text-slate-800 dark:text-slate-200">${num} =</span>
                                ${expTermsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Build Formula Calculation Step Card (Mobile Responsive)
        let calculationStepHtml = '';

        if (targetGoal === 'fpb') {
            let fpbPills = Object.entries(fpbPrimeCounts).filter(([_, exp]) => exp > 0).map(([p, exp]) => {
                const expStr = exp > 1 ? `<sup>${exp}</sup>` : '';
                return `<span class="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-emerald-500 text-white rounded-lg sm:rounded-xl font-mono font-black shadow-sm ring-2 ring-emerald-300">${p}${expStr}</span>`;
            });
            let fpbEqHtml = fpbPills.length > 0 ? fpbPills.join(' × ') : '<span class="px-2 py-0.5 bg-emerald-500 text-white rounded-lg">1</span>';

            calculationStepHtml = `
                <div class="p-3.5 sm:p-4 bg-emerald-50/90 dark:bg-emerald-950/60 border-2 border-emerald-400 dark:border-emerald-800 rounded-2xl flex flex-col gap-2 shadow-sm">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i> Perhitungan FPB:
                        </span>
                        <span class="px-2 py-0.5 bg-emerald-600 text-white text-[9px] sm:text-[10px] font-extrabold uppercase rounded-full">Target FPB</span>
                    </div>
                    <div class="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                        • Ambil faktor prima yang <strong>sama (bersekutu)</strong> dengan <strong>pangkat terkecil</strong>:
                    </div>
                    <div class="font-mono font-extrabold text-slate-900 dark:text-white text-sm sm:text-lg bg-white dark:bg-slate-900 p-2.5 sm:p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60 shadow-inner flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
                        <span>FPB(${nums.join(', ')}) =</span>
                        ${fpbEqHtml}
                        <span>=</span>
                        <span class="text-emerald-600 dark:text-emerald-400 text-xl sm:text-2xl font-black underline">${gcdVal}</span>
                    </div>
                </div>
            `;
        } else {
            let kpkPills = Object.entries(kpkPrimeCounts).filter(([_, exp]) => exp > 0).map(([p, exp]) => {
                const expStr = exp > 1 ? `<sup>${exp}</sup>` : '';
                return `<span class="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-purple-600 text-white rounded-lg sm:rounded-xl font-mono font-black shadow-sm ring-2 ring-purple-300">${p}${expStr}</span>`;
            });
            let kpkEqHtml = kpkPills.length > 0 ? kpkPills.join(' × ') : '<span class="px-2 py-0.5 bg-purple-600 text-white rounded-lg">1</span>';

            calculationStepHtml = `
                <div class="p-3.5 sm:p-4 bg-purple-50/90 dark:bg-purple-950/60 border-2 border-purple-400 dark:border-purple-800 rounded-2xl flex flex-col gap-2 shadow-sm">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-extrabold text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
                            <i data-lucide="zap" class="w-4 h-4 text-purple-500"></i> Perhitungan KPK:
                        </span>
                        <span class="px-2 py-0.5 bg-purple-600 text-white text-[9px] sm:text-[10px] font-extrabold uppercase rounded-full">Target KPK</span>
                    </div>
                    <div class="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                        • Ambil <strong>seluruh faktor prima</strong> dengan <strong>pangkat terbesar</strong>:
                    </div>
                    <div class="font-mono font-extrabold text-slate-900 dark:text-white text-sm sm:text-lg bg-white dark:bg-slate-900 p-2.5 sm:p-3 rounded-xl border border-purple-200 dark:border-purple-800/60 shadow-inner flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
                        <span>KPK(${nums.join(', ')}) =</span>
                        ${kpkEqHtml}
                        <span>=</span>
                        <span class="text-purple-600 dark:text-purple-400 text-xl sm:text-2xl font-black underline">${lcmVal}</span>
                    </div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="flex flex-col gap-3.5 sm:gap-4">
                <div class="flex items-center justify-between">
                    <h3 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <div class="p-1 sm:p-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg">
                            <i data-lucide="git-fork" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
                        </div>
                        <span>Pohon Faktor (Faktorisasi Prima)</span>
                    </h3>
                    <span class="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-extrabold text-[9px] sm:text-[10px] uppercase rounded-full border border-indigo-200 dark:border-indigo-800">
                        Target: ${targetGoal.toUpperCase()}
                    </span>
                </div>

                ${calculationStepHtml}

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    ${treesHtml}
                </div>
            </div>
        `;
        if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
    }

    // Goal Selector Buttons (FPB vs KPK Only)
    ['fpb', 'kpk'].forEach(g => {
        const btn = document.getElementById(`goal-btn-${g}`);
        if (btn) {
            btn.addEventListener('click', () => {
                playSFX(480);
                targetGoal = g;
                ['fpb', 'kpk'].forEach(k => {
                    const b = document.getElementById(`goal-btn-${k}`);
                    if (b) {
                        b.className = k === g
                            ? "goal-btn py-2 px-3 rounded-xl text-xs font-extrabold bg-indigo-600 text-white shadow-xs border border-indigo-500 transition cursor-pointer flex items-center justify-center gap-1.5"
                            : "goal-btn py-2 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition cursor-pointer hover:bg-slate-50 flex items-center justify-center gap-1.5";
                    }
                });
                runCalculator();
            });
        }
    });

    // Number Count Buttons (2, 3, 4)
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

    // Mobile Navigation & View Switching
    if (mobileTabControl && mobileTabPaper) {
        mobileTabControl.addEventListener('click', () => setMobileView('control'));
        mobileTabPaper.addEventListener('click', () => setMobileView('paper'));
    }

    if (rightViewSwitcherBtn) {
        rightViewSwitcherBtn.addEventListener('click', () => {
            playSFX(440);
            setMobileView(activeMobileTab === 'control' ? 'paper' : 'control');
        });
    }

    window.addEventListener('resize', () => {
        setMobileView(activeMobileTab);
    });

    // Start with Kontrol & Soal active on mobile when page loads
    setMobileView('control');
    renderDynamicInputs();
    runCalculator();
}
