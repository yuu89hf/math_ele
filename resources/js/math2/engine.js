/**
 * Division Engine Class (Math2 Core)
 * Handles step-by-step long division logic (porogapit).
 */
export class DivisionEngine {
    constructor(dividend = 24, divisor = 2) {
        this.reset(dividend, divisor);
    }

    reset(dividend, divisor) {
        this.dividend = parseInt(dividend, 10);
        this.divisor = parseInt(divisor, 10);
        this.currentRemainder = this.dividend;
        this.steps = [];
        this.quotientParts = [];
        this.isFinished = false;
    }

    executeStep(multiplier) {
        multiplier = parseInt(multiplier, 10);

        if (isNaN(multiplier) || multiplier <= 0) {
            return {
                success: false,
                message: 'Pengali harus berupa angka bulat positif lebih dari 0!'
            };
        }

        const product = this.divisor * multiplier;

        if (product > this.currentRemainder) {
            return {
                success: false,
                message: `Hasil ${this.divisor} × ${multiplier} = ${product} melebihi sisa saat ini (${this.currentRemainder})!`
            };
        }

        const oldRemainder = this.currentRemainder;
        const newRemainder = oldRemainder - product;

        this.quotientParts.push(multiplier);
        this.currentRemainder = newRemainder;

        const stepObj = {
            stepIndex: this.steps.length + 1,
            multiplier,
            product,
            oldRemainder,
            newRemainder,
            explanation: `Perkalian: ${this.divisor} × ${multiplier} = ${product}. Pengurangan: ${oldRemainder} − ${product} = ${newRemainder}`
        };

        this.steps.push(stepObj);

        if (this.currentRemainder === 0) {
            this.isFinished = true;
        }

        return {
            success: true,
            step: stepObj,
            isFinished: this.isFinished,
            totalQuotient: this.getTotalQuotient()
        };
    }

    getTotalQuotient() {
        return this.quotientParts.reduce((acc, val) => acc + val, 0);
    }

    generateFullSolution() {
        const solutionEngine = new DivisionEngine(this.dividend, this.divisor);
        const generatedSteps = [];

        let rem = solutionEngine.dividend;
        let div = solutionEngine.divisor;

        while (rem >= div) {
            let multiplier = 1;
            let placePower = 1;

            while (div * placePower * 10 <= rem) {
                placePower *= 10;
            }

            const friendlyMultipliers = [10, 5, 4, 3, 2, 1].map(digit => digit * placePower);
            
            for (let candidate of friendlyMultipliers) {
                if (div * candidate <= rem) {
                    multiplier = candidate;
                    break;
                }
            }

            if (div * multiplier > rem) {
                for (let d = 9; d >= 1; d--) {
                    if (div * d <= rem) {
                        multiplier = d;
                        break;
                    }
                }
            }

            if (div * multiplier > rem) {
                break;
            }

            const stepRes = solutionEngine.executeStep(multiplier);
            if (!stepRes.success) {
                break;
            }

            generatedSteps.push(stepRes.step);
            rem = solutionEngine.currentRemainder;
        }

        return {
            totalQuotient: solutionEngine.getTotalQuotient(),
            steps: generatedSteps,
            remainder: solutionEngine.currentRemainder
        };
    }

    getHint() {
        if (this.isFinished) return 'Pembagian sudah selesai!';

        let rem = this.currentRemainder;
        let div = this.divisor;

        let placePower = 1;
        while (div * placePower * 10 <= rem) {
            placePower *= 10;
        }

        let suggestedMultiplier = 1;
        for (let d = 9; d >= 1; d--) {
            if (div * (d * placePower) <= rem) {
                suggestedMultiplier = d * placePower;
                break;
            }
        }

        return `Coba gunakan pengali ${suggestedMultiplier} (${div} × ${suggestedMultiplier} = ${div * suggestedMultiplier}).`;
    }
}

export default DivisionEngine;
