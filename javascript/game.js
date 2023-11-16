var pid, score = 0,
    themissile, theufo, ufo_hstep = 5, missileLaunched = false;

function UFOlaunch(){
  //Supress comment signs in next line
  setInterval(MoveUFO, 25);
}
  
function MoveUFO(){
  var Rlimit = window.innerWidth;
  //Program here UFO movement
  var hpos_ufo = parseInt(theufo.style.left),
      width_ufo = parseInt(theufo.style.width);
  if (hpos_ufo + width_ufo + 8 > Rlimit || hpos_ufo < 0) {
    ufo_hstep = -ufo_hstep;
  }
  hpos_ufo += ufo_hstep;
  theufo.style.left = hpos_ufo + 'px';
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
function launch(){
  var uLimit = window.innerHeight,
      vpos_m,
      vstep = 5;
  if (checkforaHit()){    
     clearInterval(pid);
	vpos_m = 0;
	missileLaunched = false;
	score = score + 100;
	document.getElementById("points").innerHTML = score;
    theufo.src = "./explosion.gif";
	setTimeout(function(){theufo.src = './ufo.png', 1000});
    }        
	vpos_m = parseInt(themissile.style.bottom);
  if (vpos_m < uLimit) {
		missileLaunched = true;
		vpos_m = vpos_m + vstep;
	} else {
		clearInterval(pid);
		vpos_m = 0;
		missileLaunched = false;
		score = score - 25;
		document.getElementById("points").innerHTML = score;
	}  
	themissile.style.bottom = vpos_m + "px";
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
		case ' '         :  pullTrigger();
							break;
		}
	}
}
  
 window.onload = function(){
   themissile = document.getElementById('missile');
   theufo = document.getElementById('ufo');
   document.addEventListener('keydown', keyboardController, false);
   UFOlaunch();
 }
  