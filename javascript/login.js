import LocalStorageManager from './LocalStorageManager.js';

function dologin(event){ 
  event.preventDefault();

  let url = "http://wd.etsisi.upm.es:10000/users/login?";   
  url += "username=" + document.getElementById('username').value + "&";
  url += "password=" + document.getElementById('password').value;

  fetch(url, { method: 'GET' })
    .then(response => {
      if (response.status === 200) {
        let jwtToken = response.headers.get('authorization');
        new LocalStorageManager().setToken(jwtToken);
        Swal.fire({
          title: "<strong>Logged in!</strong>",
          icon: "success",
          html: `
            <p>Your token</p>
            <p><b>${jwtToken}</b></p>
            <p>has been saved in local</p>
          `,
          focusConfirm: true,
          confirmButtonText: `
            Retry
          `
        });
      } else {
        Swal.fire({
          title: "<strong>Login failed</strong>",
          icon: "error",
          html: `
            <p>Invalid login name or password</p>
          `,
          focusConfirm: true,
          confirmButtonText: `
            Retry
          `
        });
      }
    })
    .catch(err => console.error(err));
}

window.onload = function(){
  $("#common-navbar").load("menu.html");
  document.getElementById('btnLogin').onclick = dologin;
}
