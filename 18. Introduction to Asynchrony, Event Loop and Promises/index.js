class CountdownTimer {
    #totalSeconds = 300;
    #isRunning = false;
    #timerInterval = null;
    #minuteSlider;
    #secondSlider;
    #minuteValue;
    #secondValue;
    #timeDisplay;
    #startBtn;
    #resetBtn;

    constructor() {
        this.#initElements();
        this.#bindEvents();
        this.#updateDisplay();
        this.#updateTotalSeconds();
    }

    #initElements() {
        this.#minuteSlider = document.getElementById('minuteSlider');
        this.#secondSlider = document.getElementById('secondSlider');
        this.#minuteValue = document.getElementById('minuteValue');
        this.#secondValue = document.getElementById('secondValue');
        this.#timeDisplay = document.getElementById('timeDisplay');
        this.#startBtn = document.getElementById('startBtn');
        this.#resetBtn = document.getElementById('resetBtn');
    }

    #bindEvents() {
        this.#minuteSlider.addEventListener('input', () => {
            this.#minuteValue.textContent = this.#minuteSlider.value;
            if (!this.#isRunning) {
                this.#updateTotalSeconds();
            }
        });

        this.#secondSlider.addEventListener('input', () => {
            this.#secondValue.textContent = this.#secondSlider.value;
            if (!this.#isRunning) {
                this.#updateTotalSeconds();
            }
        });

        this.#resetBtn.addEventListener('click', () => {
            this.reset();
        });

        this.#startBtn.addEventListener('click', () => {
            this.toggleTimer();
        });
    }

    #formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    #updateDisplay() {
        this.#timeDisplay.textContent = this.#formatTime(this.#totalSeconds);
    }

    #updateTotalSeconds() {
        const minutes = parseInt(this.#minuteSlider.value);
        const seconds = parseInt(this.#secondSlider.value);
        this.#totalSeconds = minutes * 60 + seconds;
        this.#updateDisplay();

        this.#startBtn.disabled = this.#totalSeconds === 0;
    }

    #enableSliders() {
        this.#minuteSlider.disabled = false;
        this.#secondSlider.disabled = false;
    }

    #disableSliders() {
        this.#minuteSlider.disabled = true;
        this.#secondSlider.disabled = true;
    }

    reset() {
        if (this.#timerInterval) {
            clearInterval(this.#timerInterval);
            this.#timerInterval = null;
        }
        this.#minuteSlider.value = 0;
        this.#secondSlider.value = 0;
        this.#isRunning = false;
        this.#startBtn.textContent = '▶ Start';
        this.#enableSliders();

        this.#updateTotalSeconds();
    }


    start() {

        this.#isRunning = true;
        this.#disableSliders();
        this.#startBtn.textContent = '⏸ Pause';
        this.#timerInterval = setInterval(() => this.#tick(), 1000);


    }

    pause() {
        clearInterval(this.#timerInterval);
        this.#isRunning = false
        this.#enableSliders();
        this.#startBtn.textContent = '▶ Start';
    }

    #tick() {
        //     // Приватный метод - один тик таймера
        this.#totalSeconds -= 1;
        this.#updateDisplay();

        if (this.#totalSeconds === 0) {
            this.#onTimerComplete();
        }
    }

    #onTimerComplete() {
        this.pause();
        alert('Time is over!');
    }

    toggleTimer() {
        if (this.#isRunning) {
            this.pause();
        } else {
            this.start();
        }
     }

    get isRunning() {
        return this.#isRunning;
    }

    get timeLeft() {
        return this.#totalSeconds;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const timer = new CountdownTimer();


    console.log(timer.timeLeft);
});