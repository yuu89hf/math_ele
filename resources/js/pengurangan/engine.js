/**
 * SubtractionEngine - Pure Step-by-Step Vertical Subtraction
 * Clean sequential steps: Borrow -> Subtract column-by-column without extra jumping animations.
 */
export class SubtractionEngine {
    constructor(minuend = 27, subtrahend = 9) {
        this.reset(minuend, subtrahend);
    }

    reset(minuend, subtrahend) {
        this.minuend = Math.max(1, Math.abs(parseInt(minuend, 10) || 0));
        this.subtrahend = Math.max(0, Math.abs(parseInt(subtrahend, 10) || 0));

        if (this.minuend < this.subtrahend) {
            let temp = this.minuend;
            this.minuend = this.subtrahend;
            this.subtrahend = temp;
        }

        this.topDigits = String(this.minuend).split('').map(Number).reverse();
        this.botDigits = String(this.subtrahend).split('').map(Number).reverse();

        while (this.botDigits.length < this.topDigits.length) {
            this.botDigits.push(0);
        }

        this.currentTop = [...this.topDigits];
        this.currentBot = [...this.botDigits];
        
        this.borrowStates = new Array(this.topDigits.length).fill(null);
        this.resultDigits = new Array(this.topDigits.length).fill(null);

        this.isFinished = false;
        this.steps = [];

        this.generateStepSequence();
        this.stepPointer = 0;
    }

    generateStepSequence() {
        this.stepSequence = [];
        let workingTop = [...this.topDigits];

        for (let col = 0; col < workingTop.length; col++) {
            let topVal = workingTop[col];
            let botVal = this.botDigits[col];

            // If top < bot, borrow step
            if (topVal < botVal) {
                let borrowCol = col + 1;
                while (borrowCol < workingTop.length && workingTop[borrowCol] === 0) {
                    borrowCol++;
                }

                if (borrowCol < workingTop.length) {
                    for (let c = borrowCol; c > col; c--) {
                        let donorOrig = workingTop[c];
                        workingTop[c] -= 1;
                        let donorNew = workingTop[c];
                        
                        let recipientOrig = workingTop[c - 1];
                        workingTop[c - 1] += 10;
                        let recipientNew = workingTop[c - 1];

                        this.stepSequence.push({
                            type: 'borrow',
                            col: c - 1,
                            donorCol: c,
                            donorOrig,
                            donorNew,
                            recipientCol: c - 1,
                            recipientOrig,
                            recipientNew,
                            message: `Pinjam 1 puluhan dari kolom ${this.getColName(c)}: ${donorOrig} → ${donorNew}. Kolom ${this.getColName(c-1)}: ${recipientOrig} → ${recipientNew}!`
                        });
                    }
                }
                topVal = workingTop[col];
            }

            // Subtract step
            let diff = topVal - botVal;
            this.stepSequence.push({
                type: 'subtract',
                col,
                topVal,
                botVal,
                diff,
                message: `Hitung kolom ${this.getColName(col)}: ${topVal} - ${botVal} = ${diff}`
            });
        }
    }

    getColName(colIndex) {
        const names = ['Satuan', 'Puluhan', 'Ratusan', 'Ribuan'];
        return names[colIndex] || `Kolom ${colIndex + 1}`;
    }

    getCurrentStepInfo() {
        if (this.stepPointer >= this.stepSequence.length) {
            return null;
        }
        return this.stepSequence[this.stepPointer];
    }

    executeCurrentStep() {
        if (this.isFinished || this.stepPointer >= this.stepSequence.length) {
            return { success: false, message: 'Pengurangan sudah selesai!' };
        }

        const step = this.stepSequence[this.stepPointer];
        this.steps.push(step);

        if (step.type === 'borrow') {
            this.currentTop[step.donorCol] = step.donorNew;
            this.currentTop[step.recipientCol] = step.recipientNew;
            this.borrowStates[step.donorCol] = {
                blurred: true,
                origVal: step.donorOrig,
                newVal: step.donorNew
            };
            this.borrowStates[step.recipientCol] = {
                boosted: true,
                origVal: step.recipientOrig,
                newVal: step.recipientNew
            };
        } else if (step.type === 'subtract') {
            this.resultDigits[step.col] = step.diff;
        }

        this.stepPointer++;
        if (this.stepPointer >= this.stepSequence.length) {
            this.isFinished = true;
        }

        return {
            success: true,
            step,
            isFinished: this.isFinished,
            finalResult: this.isFinished ? this.minuend - this.subtrahend : null
        };
    }
}
