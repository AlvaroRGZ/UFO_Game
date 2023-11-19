
function dologin(){ 
  let url = "http://wd.etsisi.upm.es:10000/users/login?";   
  url += "username=" + document.getElementById('username').value + "&";
  url += "password=" + document.getElementById('password').value;

  fetch(url, { method: 'GET' })
    .then(response => {
      if (response.status === 200) {
        let jwtToken = response.headers.get('authorization');
        document.getElementById('resultado').innerHTML = jwtToken;
      } else {
        alert("There was an ERROR with the URL");
      }
    })
    .catch(err => console.error(err));
}

window.onload = function(){
  $("#common-navbar").load("menu.html");
  document.getElementById('info').onclick = dologin;
}
