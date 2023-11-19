export default class Missile {
  constructor() {
    this.element = document.getElementById('missile');
    this.launched = false;
    this.launchingPID = null;
  }

  move(vstep, uLimit) {
    let vpos_m = parseInt(this.element.style.bottom);
    let displacement = vpos_m + vstep;
    if (displacement < uLimit) {
      this.element.style.bottom = displacement + 'px';
    } else {
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
  }

  checkForHit(ufo) {
    const hpos_ufo = parseInt(ufo.element.style.left);
    const vpos_ufo = parseInt(ufo.element.style.top);
    const width_ufo = ufo.width;
    const height_ufo = ufo.element.offsetHeight;
    const vpos_m = parseInt(this.element.style.bottom);
    const hpos_m = parseInt(this.element.style.left);
    const width_m = parseInt(this.element.style.width);
    const height_m = parseInt(this.element.style.height);

    return (
        false
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