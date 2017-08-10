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
    type: ['restaurant']
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
      text +=`<p class="pull-right"><img src="${result[i].photos[0].getUrl({maxWidth:100})}" alt="Smiley face" ></p>`
    }
    text +=`<p class="places-list-title"> <a href="places/${result[i].place_id}"> ${result[i].name}</a></p>
            <p class="places-list-ratings">Google Rating: ${giveRatings(result[i].rating)}</p>`

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
  star_good = `<span class="glyphicon glyphicon-star" aria-hidden="true" style="color:yellow" ></span>`
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
    server_data = `<div>
            <p class="places-list-ratings">Q-finder Rating: ${giveRatings(response.rating)}</p>
            </div>`
    $server_data = $(server_data)
    $(document).find(`#${response.map_id}`).append(server_data).parent().show()
  })
}


$( document ).ready(function() {
    console.log( "ready!" );
    initMap()

});


// https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
//https://developers.google.com/places/supported_types
//https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests

