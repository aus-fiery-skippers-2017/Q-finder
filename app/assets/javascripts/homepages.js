// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require jquery

var submit_info = null;

$( document ).ready(function() {

    $('.search-submit').on('submit', function(event){
        event.preventDefault();
        var $form = $(this);

        var search = $form.children().first().val();
        initSearch(search)
      })
});

function initSearch(search_term) {
        var map = new google.maps.Map(document.createElement('div'));
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

       var service = new google.maps.places.PlacesService(map);
        service.textSearch({
          query: search_term
        }, callback);
        function callback(result) {
          result = result.shift();

        submit_info = {name:result.name,lat:result.geometry.location.lat().toString(),lng:result.geometry.location.lng().toString()}

        console.log(submit_info)
        }
}


