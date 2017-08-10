//= require jquery

var submit_info = null;
function initMap(search_term) {
        var map = new google.maps.Map(document.createElement('div'));
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

       var service = new google.maps.places.PlacesService(map);
        service.textSearch({
          query:'search_term',
        }, callback);
        function callback(results,) {
        submit_info = {name:result.name,lat:result.geometry.location.lat().toString(),lng:result.geometry.location.lng().toString()}
        }
}

$( document ).ready(function() {
    console.log( "ready!" );
    initMap()

});
