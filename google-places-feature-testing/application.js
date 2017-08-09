// This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var map;
      var infowindow;

      function initMap() {
        var austin = {lat: 30.2672, lng: -97.7431};

        map = new google.maps.Map(document.getElementById('map'), {
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
        textIt(results)
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
function textIt(result) {

  for (var i = 0; i < result.length;i++)  {
    // console.log(result[i].geometry)
    // console.log(result[i].html_attributions)
    // console.log(result[i].icon)
    // console.log(result[i].id)
    // console.log(result[i].name)
    // console.log(result[i].opening_hours)
    // console.log(result[i].photos)
    // console.log(result[i].place_id)
    // console.log(result[i].rating)
    // console.log(result[i].reference)
    // console.log(result[i].types)

  }
}

$( document ).ready(function() {
    console.log( "ready!" );
    initMap()

});


// https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
//https://developers.google.com/places/supported_types
//https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests

