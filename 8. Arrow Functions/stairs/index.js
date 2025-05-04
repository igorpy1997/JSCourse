let ladder = {
    currentStep: 0,

    up() {
        this.currentStep++;
        return this;
    },

    down() {
        this.currentStep--;
        return this;
    },

    showStep() {
        return this.currentStep;
    }
};

let step = ladder.up().up().up().down().showStep();
console.log(step);

