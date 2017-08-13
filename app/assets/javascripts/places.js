// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require jquery
var map;
var infowindow;

function initMap() {

  map = new google.maps.Map(document.getElementById('map-container'), {
    center: this_place,
    zoom: 13
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.textSearch({
    location: this_place,
    query:'barbeque',
    radius: 2500,
    type: ['restaurant', 'food', 'establishment']
  }, callback);
}

function callback(results, status,pagination) {
  $("#stuff").html(htmlIt(results))
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

//--------------------------------------------------what i'm writing-----------------------
function htmlIt(result) {
  text ="<ul class='list-group'>"
  for (var i = 0; i < result.length;i++)  {
    text +=`<li class="list-group-item" id="${result[i].place_id}"> `
    if (result[i].photos){
      text +=`<div class="pull-right center-cropper-title" style="background-image:url(${result[i].photos[0].getUrl({maxWidth:100})});"></div>`
    }
    text +=`<div class="bbq-place-info"><p class="places-list-title"> <a href="places/${result[i].place_id}"> ${result[i].name}</a></p>
            <p class="places-list-ratings">Google Rating: <span class="no-split">${giveRatings(result[i].rating)}</span></p></div>`

    text +=`</li>`
    callAjax(result[i])
  }
  text+="</ul>"

  $text = $(text).hide();
  return ($text)

}

function giveRatings(number)  {
  number > 5 ? number = 0: number;
  number === null ? number = 0: number;
  star_bad = `<span class="glyphicon glyphicon-star" aria-hidden="true" style="color:black" ></span>`
  star_good = `<span class="glyphicon glyphicon-star" aria-hidden="true" style="color:orange" ></span>`
  rating = ""
  for(var i = 0; i < 5; i++) {
    if ( number <= i){
      rating += star_bad
    } else {
      rating += star_good
    }
  }
  return rating
}

function callAjax (result) {
  $.ajax({
    method: "GET",
    url: `places/${result.place_id}`,
    data: {name:result.name,lat:result.geometry.location.lat().toString(),lng:result.geometry.location.lng().toString()}
  }).done(function(response){
    server_data = `
            <p class="places-list-ratings">Q-finder Rating: <span class="no-split">${giveRatings(response.rating)}</span></p>
            `
    $server_data = $(server_data)
     $(document).find(`#${response.map_id}`).find(".bbq-place-info").append(server_data)
    $(document).find(`#${response.map_id}`).parent().show()
  })
}


$( document ).ready(function() {
    console.log( "ready!" );
    initMap()

});


// https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
//https://developers.google.com/places/supported_types
//https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests

