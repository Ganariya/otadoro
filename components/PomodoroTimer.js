const MINUTES_OF_ONE_POMODORO = 25
const MINUTES_OF_ONE_SHORT_BREAK = 5
const MINUTES_OF_ONE_LONG_BREAK = 15

module.exports = class PomodoroTimer {
    constructor() {
        this.tomato = 0
        this.remainSeconds = 0
        this.id = -1
    }

    workStart() {
        console.log(this)
        this.remainSeconds = MINUTES_OF_ONE_POMODORO * 60
        this.id = setInterval(() => {
            this.remainSeconds -= 1
            if (this.remainSeconds < 0) {
                clearInterval(this.id)
            }
        }, 1000);
    }

    workStop() {
        clearInterval(this.id)
    }

    static get minutesOfOnePomodoro() {
        return MINUTES_OF_ONE_POMODORO
    }

    static get minutesOfOneShortBreak() {
        return MINUTES_OF_ONE_SHORT_BREAK
    }

    static get minutesOfOneBreak() {
        return MINUTES_OF_ONE_LONG_BREAK
    }

}