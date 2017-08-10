// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require jquery
var map;
var infowindow;

function initMap() {
  var austin = {lat: 30.2672, lng: -97.7431};

  map = new google.maps.Map(document.getElementById('map-container'), {
    center: austin,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.textSearch({
    location: austin,
    query:'barbeque',
    radius: 2500,
    type: ['restaurant']
  }, callback);
}

function callback(results, status,pagination) {
  $("#stuff").html(htmlIt(results))
  console.log(results)
  // console.log(pagination)
  // console.log(pagination.nextPage())
  // $('#stuff').html(textIt(results))
  // console.log(results)
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
function htmlIt(result) {
  text ="<ul>"
  for (var i = 0; i < result.length;i++)  {
    text +=`<li id="${result[i].id}"><p> Place:${result[i].name}</p>
            <p>place_id${result[i].id}</p>`
    if (result[i].photos){
      text +=`<p><img src="${result[i].photos[0].getUrl({maxWidth:100})}" alt="Smiley face" ></p>`
    }
    text +=`</li>`
    $.ajax({
      method: "GET",
      url: `places/${result[i].id}`,
      data: {data:JSON.stringify(result[i].name)}
    }).done(function(response){
      $(document).find(`#${response.map_id}`).append(`<p> created at ${response.created_at} </p>`)
    })
  }
  text+="</ul>"
  return (text)

}

$( document ).ready(function() {
    console.log( "ready!" );
    initMap()

});


// https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
//https://developers.google.com/places/supported_types
//https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests

