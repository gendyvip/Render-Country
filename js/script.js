var lat, lng, myLat, myLng;
var sel = document.querySelector("select");
console.log(sel);
navigator.geolocation.getCurrentPosition(success, error);
function success(pos) {
  myLng = pos.coords.longitude;
  myLat = pos.coords.latitude;
  initMap(myLat, myLng); 
}

function error(e) {
  alert(e.message);
}
sel.addEventListener("input", function () {
  if (sel.value == "egypt") getCountryPosition("egypt");
  if (sel.value == "usa") getCountryPosition("usa");
  if (sel.value == "france") getCountryPosition("france");
  if (sel.value == "germany") getCountryPosition("germany");
});

function getCountryPosition(countryName) {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://nominatim.openstreetmap.org/search?format=json&q=${countryName}`
  );
  request.send();
  request.onload = function () {
    var data = JSON.parse(request.responseText);
    lat = parseFloat(data[0].lat);
    lng = parseFloat(data[0].lon); 
    console.log(lat, lng);
    initMap(lat, lng); 
  };
}

function initMap(lat, lng) {
  const myLatLng = { lat: lat, lng: lng };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
}

