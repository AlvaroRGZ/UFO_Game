
export default class Missile {
  constructor() {
    this.element = document.getElementById('missile');
    this.launched = false;
    this.game = null;

    //style="position:absolute; left:300px; bottom:0px; height:70px; width:40px; z-index:10"
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
    if (hpos_m < rLimit) {
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
    const vpos_ufo = parseInt(ufo.element.style.bottom);
    const width_ufo = ufo.width;
    const vpos_m = parseInt(this.element.style.bottom);
    const hpos_m = parseInt(this.element.style.left);
    const width_m = parseInt(this.element.style.width);
    const height_m = parseInt(this.element.style.height);
  
    return (
      vpos_m + height_m <= vpos_ufo + width_ufo &&
      vpos_m + width_m >= vpos_ufo &&
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