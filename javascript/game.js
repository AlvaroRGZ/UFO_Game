import Missile from './missile.js';
import UFO from './ufo.js';
import LocalStorageManager from './LocalStorageManager.js';

export default class Game {
  constructor() {
    this.localStorageManager = new LocalStorageManager();
    this.numbersOfUFOs = this.localStorageManager.getNumberOfUFOs();
    this.totalTime = this.localStorageManager.getTime();
    this.missile = null;
    this.ufos = [];
    this.ufoDirections = [];
    this.pid = null;
    this.score = 0;
    this.ufo_hstep = 5;
  }

  start() {
    this.createUFOs();
    setInterval(() => this.moveUFOs(), 25);

    this.missile = new Missile();
    this.missile.setGame(this);
    this.registerKeyDownListeners();
    this.startTimeLeftCounter();
  }

  killLaunchingPid() {
    clearInterval(this.pid);
    this.pid = null;
  }

  createUFOs() {
    for (let i = 0; i < this.numbersOfUFOs; i++) {
      const ufo = new UFO(i);
      this.ufos.push(ufo);
      this.ufoDirections.push(Math.random() < 0.5 ? -1 : 1);
      ufo.create();
    }
  }

  moveUFOs() {
    const Rlimit = window.innerWidth;
    for (let i = 0; i < this.ufos.length; i++) {
      const ufo = this.ufos[i];
      const newHpos = ufo.move(this.ufo_hstep * this.ufoDirections[i], Rlimit);

      this.ufoDirections[i] *= newHpos;
    }
  }

  pullTrigger() {
    this.missile.markAsLaunched()
    this.pid = setInterval(() => this.launch(), 10);
  }

  checkForHit() {
    for (let ufo of this.ufos) {
      if (this.missile.checkForHit(ufo)) {
        this.registerUFODown();
        ufo.explode();
        setTimeout(() => ufo.reset(), 1000);
        this.missile.resetPosition();
      }
    }
  }

  launch() {
    const uLimit = window.innerHeight;
    if (this.missile.isLaunched()) {
      this.missile.move(10, uLimit);
      this.checkForHit();
    }
  }

  moveMissileRight() {
    this.missile.moveRight(window.innerWidth - 35);
  }

  moveMissileLeft() {
    this.missile.moveLeft(10);
  }

  registerKeyDownListeners() {
    document.addEventListener('keydown', (event) => this.keyboardController(event), false);
  }

  keyboardController(event) {
    const code = event.key;
    if (!this.missile.isLaunched()) {
      switch (code) {
        case 'ArrowRight':
          this.moveMissileRight();
          break;
        case 'ArrowLeft':
          this.moveMissileLeft();
          break;
        case ' ':
          this.pullTrigger();
          break;
      }
    }
  }

  startTimeLeftCounter(){
    let time = this.totalTime;
    document.getElementById("timeLeft").innerHTML = time;
    let timePID = setInterval(() => {
      if (time === 0) {
        clearInterval(timePID);
        this.displayEndOfTheGame();
      } else {
        time = parseInt(document.getElementById("timeLeft").innerHTML) - 1;
        document.getElementById("timeLeft").innerHTML = time;

        if (time === 15) {
          document.getElementById("timeLeft").style.color = 'red';
        }
      }
    }
    , 1000);
  }

  displayTutorial() {
    Swal.fire({
      title: 'UFO Game Tutorial',
      html: `
      <div>
        <p>Welcome to the UFO Game! Here's a quick guide to get you started:</p>
        <ul>
          <li>Use the <strong>arrow keys</strong> to move the missile <strong>left and right</strong>.</li>
          <li>Press the <strong>space bar</strong> to launch the missile.</li>
        </ul>
        <p>Shoot down the UFOs and score points before the time runs out!</p>
      <div>
      `,
      icon: 'info',
      confirmButtonText: 'Start'
    })
  }

  displayEndOfTheGame() {
    Swal.fire({
      title: "<strong>Game over!</strong>",
      html: `
        <div>
          <p>Score: <b>${this.score}</b></p>
          <p>UFOs Used: <b>${this.numbersOfUFOs}</b></p>
          <p>Penalties: <b>-${this.calculatePenalties()}</b></p>
          <p>Final Score: <b>${this.calculateFinalScore()}</b></p>
        </div>
      `,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Play again",
      denyButtonText: `See records`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else if (result.isDenied) {
        window.location.href = 'records.html';
      } else {
        window.location.href = 'presentation.html';
      }
    });
  }

  calculateFinalScore() {
    let factor = this.totalTime / 60;
    let penalty = this.calculatePenalties();
    return (this.score / factor) - penalty; 
  }

  calculatePenalties() {
    return 50 * (this.numbersOfUFOs - 1);
  }

  registerUFODown() {
    this.score += 100;
    document.getElementById("score").innerHTML = this.score;
  }

  registerMissedShot() {
    this.score -= 25;
    document.getElementById("score").innerHTML = this.score;
  }
}

window.onload = function () {
  var game = new Game();
  game.displayTutorial();
  game.start();
};
