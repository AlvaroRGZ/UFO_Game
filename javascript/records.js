
function responseProcess(http_request) {
  if(http_request.response.status == 200) {
    jwtToken = http_request.getAllResponseHeaders().match(/authorization:*/i)[0];
    document.getElementById('resultado').innerHTML = jwtToken;
  } else {
    alert("There was an ERROR with the URL");
  }
} 

function loadRecords(){ 
  let table = document.getElementById('records_table'); 

  fetch('http://wd.etsisi.upm.es:10000/records', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function(response) {
      if (response.ok)
        return response.json();
    })
    .then(function(data) {
      let html = '';
      for (let record of data) {
        html += '<tr>';
        for (let prop in record) {
          if (prop === 'recordDate') {
            let date = new Date(record[prop]);
            html += `<td>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</td>`;
          } else {
            html += `<td>${record[prop]}</td>`;
          }
        }
        html += '</tr>';
      }
      table.innerHTML += html;
    })
    .catch(function(err) {
      console.error(err);
    });
}

window.onload = function(){
  $("#common-navbar").load("menu.html");
  loadRecords();
}


