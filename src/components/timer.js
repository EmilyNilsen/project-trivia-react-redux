export default class Timer {
  constructor() {
    this.state = {
      seconds: 30,
      timer: '',
    };

    this.startTimer = this.startTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.isTimerRunning = this.isTimerRunning.bind(this);
  }

  startTimer(updateTimer) {
    const ONE_SECOND = 1000;

    this.state.seconds = 30;

    const newTimer = setInterval(() => {
      const { seconds } = this.state;
      updateTimer(seconds);
      if (seconds === 0) this.clearTimer();
      else this.state.seconds = seconds - 1;
    }, ONE_SECOND);
    this.state.timer = newTimer;
  }

  clearTimer() {
    clearInterval(this.state.timer);
    this.state.timer = undefined;
  }

  isTimerRunning() {
    const { timer, seconds } = this.state;
    console.log(timer);
    return seconds > 0 || timer !== undefined;
  }
}
