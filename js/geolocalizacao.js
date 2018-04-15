var watchID;
var latitude;
var longitude;
function iniciarCaptura(){
  watchID = navigator.geolocation.watchPosition(mostrarTela, fail, { timeout: 4500, enableHighAccuracy: true});
}

function mostrarTela(position){
  var html ='Latitude: ' + position.coords.latitude         + '<br />' +
  'Longitude: '         + position.coords.longitude         + '<br />' +
  'Altitude: '          + position.coords.altitude          + '<br />' +
  'Precisão: '          + position.coords.accuracy          + '<br />' +
  'Precisão de altitude: ' + position.coords.altitudeAccuracy  + '<br />' +
  'Direção: '           + position.coords.heading           + '<br />' +
  'Velocidade: '        + position.coords.speed             + '<br />' +
  'Timestamp: '         + new Date(position.timestamp)      + '<br />';

  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  var result = document.getElementById("result");

  result.innerHTML = html;
}

function fail(error){   
     Materialize.toast('Ativar Localização do Aparelho', 4000)
  

}

function pararCaptura(){
  if(watchID){
    navigator.geolocation.clearWatch(watchID);
    watchID=null;
  }

}


