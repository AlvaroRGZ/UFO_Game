
export default class Missile {
  constructor() {
    this.element = document.getElementById('missile');
    this.launched = false;
    this.game = null;

    this.element.style.position = 'absolute';
    this.element.style.left = 300 + 'px';
    this.element.style.bottom = 0 + 'px';
    this.element.style.height = 70 + 'px';
    this.element.style.width = 40 + 'px';
    this.element.style.zIndex = 10;
  }

  setGame(game) {
    this.game = game;
  }

  move(vstep, uLimit) {
    let vpos_m = parseInt(this.element.style.bottom);
    let displacement = vpos_m + vstep;
    if (displacement < uLimit) {
      this.element.style.bottom = displacement + 'px';
    } else {
      this.game.registerMissedShot();
      this.resetPosition();
    }
  }

  moveRight(rLimit) {
    const hpos_m = parseInt(this.element.style.left);
    if (hpos_m < rLimit - 15) {
      this.element.style.left = hpos_m + 10 + 'px';
    }
  }

  moveLeft(hstep) {
    const hpos_m = parseInt(this.element.style.left);
    if (hpos_m > 10) {
      this.element.style.left = hpos_m - hstep + 'px';
    }
  }

  resetPosition() {
    this.element.style.bottom = '0px';
    this.markAsNotLaunched();
    this.game.killLaunchingPid()
  }

  checkForHit(ufo) {
    const hpos_ufo = parseInt(ufo.element.style.left);
    const vpos_ufo = parseInt(ufo.element.style.top);
    const height_ufo = parseInt(this.element.style.height);
    const width_ufo = ufo.width;
    const vpos_m = parseInt(this.element.style.bottom);
    const hpos_m = parseInt(this.element.style.left);
    const width_m = parseInt(this.element.style.width);
    const height_m = parseInt(this.element.style.height);
  
    return (
      window.innerHeight - (vpos_ufo + height_ufo) <= vpos_m + height_m &&
      window.innerHeight - (vpos_ufo + height_ufo) >= vpos_m &&
      hpos_m + width_m / 2 >= hpos_ufo && 
      hpos_m + width_m / 2 <= hpos_ufo + width_ufo
    );
  }
  

  isLaunched() {
    return this.launched;
  }

  markAsLaunched() {
    this.launched = true;
  }

  markAsNotLaunched() {
    this.launched = false;
  }
}