const MINUTES_OF_ONE_POMODORO = 25
const MINUTES_OF_ONE_SHORT_BREAK = 5
const MINUTES_OF_ONE_LONG_BREAK = 15

let main = null

module.exports = class PomodoroTimer {
    constructor(_main) {
        main = _main
        this.tomato = 0
        this.remainSeconds = 0
        this.id = -1
    }

    workStart() {
        console.log(this)
        this.remainSeconds = MINUTES_OF_ONE_POMODORO * 60
        this.remainSeconds = 10
        this.id = setInterval(() => {
            this.remainSeconds -= 1
            if (this.remainSeconds < 0) this.workFinish()
        }, 1000);
    }

    workFinish() {
        clearInterval(this.id)
        this.tomato += 1
        main.wakeUpOtadoroWindow()
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