export default class LocalStorageManager {
  DEFAULT_UFOs_NUMBER = 3;
  DEFAULT_TIME = 3;
  constructor() {
  }
  getNumberOfUFOs() {
    let numberOfUFOs = localStorage.getItem("numberOfUFOs");
    if (numberOfUFOs != null) {
      return numberOfUFOs;
    }
    return this.DEFAULT_UFOs_NUMBER;
  }

  getTime() {
    let time = localStorage.getItem("time");
    if (time != null) {
      return time;
    }
    return this.DEFAULT_TIME;
  }

  setNumberOfUFOs(numberOfUFOs) {
    if (numberOfUFOs != null) {
      localStorage.setItem("numberOfUFOs", numberOfUFOs);
    } else {
      localStorage.setItem("numberOfUFOs", this.DEFAULT_UFOs_NUMBER);
    }
  }

  setTime(time) {
    if (time != null) {
      localStorage.setItem("time", time);
    } else {
      localStorage.setItem("time", this.DEFAULT_TIME);
    }
  }
}