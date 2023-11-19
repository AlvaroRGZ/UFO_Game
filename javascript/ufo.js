export default class UFO {

  constructor(id) {
    this.id = 'ufo' + id;
    this.numeralID = id;
    this.width = 60;
    this.element = null;
  }

  create() {
    let n = Math.random();
    const randomLeft = n * (window.innerWidth - this.width);
    this.element = document.createElement('img');
    this.element.id = this.id;
    this.element.src = '../media/images/ufo.png';
    this.element.style.position = 'absolute';
    this.element.style.left = randomLeft + 'px';
    this.element.style.top = this.numeralID * this.width + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.bottom = '60px';
    document.getElementById("UFO_space").appendChild(this.element);
  }

  move(hstep, Rlimit) {
    const hpos_ufo = parseInt(this.element.style.left);
    const newHpos = hpos_ufo + hstep;
    if (newHpos > Rlimit - this.width || newHpos < 0) {
      return -1;
    }
    this.element.style.left = newHpos + 'px';
    return 1;
  }

  explode() {
    this.element.src = '../media/gifs/explosion.gif';
  }

  reset() {
    this.element.src = '../media/images/ufo.png';
  }
}