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
    text +=`<li class="list-group-item" id="${result[i].id}">
            <p class="places-list-title"> ${result[i].name}</p>`
    if (result[i].photos){
      text +=`<p><img src="${result[i].photos[0].getUrl({maxWidth:100})}" alt="Smiley face" ></p>`
    }
    text +=`</li>`
    $.ajax({
      method: "GET",
      url: `places/${result[i].id}`,
      data: {data:result[i].name}
    }).done(function(response){
      server_data = `<div>
              <p> created at ${response.created_at} </p>
              <p class="places-list-ratings">Rating: ${giveRatings(response.rating)}</p>
              </div>`
      $server_data = $(server_data)
      $(document).find(`#${response.map_id}`).append(server_data).parent().show()

    })
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


$( document ).ready(function() {
    console.log( "ready!" );
    initMap()

});


// https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
//https://developers.google.com/places/supported_types
//https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests

