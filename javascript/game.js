import Missile from './missile.js';
import UFO from './ufo.js';

export class Game {
  constructor() {
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
    this.registerKeyDownListeners();
  }

  createUFOs() {
    for (let i = 0; i < 5; i++) {
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
        clearInterval(this.pid);
        this.missile.resetPosition();
        this.score += 100;
        document.getElementById("points").innerHTML = this.score;
        ufo.explode();
        setTimeout(() => ufo.reset(), 1000);
      } else {
        this.score -= 25;
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
}

window.onload = function () {
  var game = new Game();
  game.start();
};
