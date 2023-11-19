var pid, score = 0,
    themissile, theufo, ufo_hstep = 5, missileLaunched = false;
var ufos = [];
var ufoDirections = [];

function UFOlaunch(){
  for (let i = 0; i < 5; i++) {
    createUFO();
    ufoDirections.push(Math.random() < 0.5 ? -1 : 1); // generate a random direction for each UFO
  }
  setInterval(MoveUFO, 25);
}

function createUFO(){
  var newUFO = buildUFO();
  var newUFOID = ufos.length;
  ufos.push("ufo" + newUFOID);
  document.getElementById("UFO_space").innerHTML += newUFO;
}

function buildUFO(){
  var ufo = "<img ";
  ufo += "id = 'ufo" + ufos.length + "' ";
  ufo += "src = '../media/images/ufo.png' ";
  var randomLeft = Math.random() * (window.innerWidth - 70); // generate a random starting position within screen width minus UFO width
  ufo += "style = 'position:absolute; left:" + randomLeft + "px;top:10px;width:60px;bottom:1px'/> ";
  return ufo;
}

function MoveUFO(){
  var Rlimit = window.innerWidth;
  for (let i = 0; i < ufos.length; i++) {
    var theufo = document.getElementById(ufos[i]);
    var hpos_ufo = parseInt(theufo.style.left),
        width_ufo = parseInt(theufo.style.width);
    var newHpos = hpos_ufo + ufo_hstep * ufoDirections[i];
    if (newHpos > Rlimit - width_ufo) {
      newHpos = Rlimit - width_ufo;
      ufoDirections[i] = -1;
    } else if (newHpos < 0) {
      newHpos = 0;
      ufoDirections[i] = 1;
    }
    theufo.style.left = newHpos + 'px';
  }
}

function pullTrigger(){
  pid = setInterval(launch, 10);
}
  
function checkforaHit(){
   var hpos_ufo = parseInt(theufo.style.left),
       vpos_ufo = parseInt(theufo.style.bottom),
       width_ufo = parseInt(theufo.style.width),
       vpos_m = parseInt(themissile.style.bottom),
       hpos_m = parseInt(themissile.style.left),
       width_m = parseInt(themissile.style.width),
       height_m = parseInt(themissile.style.height),
       hit = (vpos_m + height_m >= vpos_ufo)&&
			 (hpos_m + width_m/2 >= hpos_ufo)&&
			 (hpos_m + width_m/2 <= hpos_ufo + width_ufo)&&
			 (vpos_m <= vpos_ufo);
    return hit;
}
function launch() {
  var uLimit = window.innerHeight,
      vpos_m = parseInt(themissile.style.bottom),
      vstep = 5;

  if (checkforaHit()) {
    clearInterval(pid);
    vpos_m = 0;
    missileLaunched = false;
    score = score + 100;
    document.getElementById("points").innerHTML = score;
    theufo.src = "./explosion.gif";
    setTimeout(function () {
      theufo.src = './ufo.png';
    }, 1000);
  }

  if (vpos_m < uLimit) {
    missileLaunched = true;
    vpos_m = vpos_m + vstep;
  } else {
    vpos_m = 0;
    missileLaunched = false;
  }

  themissile.style.bottom = vpos_m + 'px'; // update the missile's position
}

function moveMissileRight(){
  var rLimit = window.innerWidth, 
      hpos_m, misWidth, hstep = 10;
  // Program here missile right movement
  hpos_m = parseInt(document.getElementById('missile').style.left);
  hpos_m = hpos_m + hstep;
  if (hpos_m < rLimit - 35) {
	document.getElementById('missile').style.left = (hpos_m) + "px";
	}
}

function moveMissileLeft(){  
  var hstep = 10, hpos_m; 
  //Program here missile left movement
    hpos_m = parseInt(document.getElementById('missile').style.left);
  hpos_m = hpos_m - hstep;
  if (hpos_m > 10) {
	document.getElementById('missile').style.left = (hpos_m) + "px";
	}
}  
  
function keyboardController (theEvent){
  let interval = 15;    
  let code = theEvent.key;
  if (!missileLaunched) {
	  switch (code){
		case 'ArrowRight':  moveMissileRight();      
							break;
		case 'ArrowLeft':   moveMissileLeft();      
							break;
		case ' ':  pullTrigger();
							break;
		}
	}
}
  
 window.onload = function(){
   themissile = document.getElementById('missile');
   //theufo = document.getElementById('ufo');
   createUFO();
   document.addEventListener('keydown', keyboardController, false);
   UFOlaunch();
 }
  