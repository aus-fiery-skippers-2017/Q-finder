//= require jquery

function initMap() {
        var map = new google.maps.Map(document.getElementById('map-container'), {
          center: this_place,
          zoom: 15
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.getDetails({
          placeId: place_id
        }, function(place, status) {
          console.log(place)

          $("#rating").html(giveRatings(place.rating))
          $("#phone_number").html(place.formatted_phone_number)
          $("#Hours").html(format_hours(place.opening_hours.weekday_text))
          $("#address").html(place.formatted_address)

          addGoogleRatings(place.reviews)

          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address + '</div>');
              infowindow.open(map, this);
            });
          }
        });
      }
function format_hours(hours){
  return `<p> ${hours.join("</p> <p>")} </p> `
}

function addGoogleRatings(reviews)  {
  for (var review of reviews) {
    console.log(review)
    list_element = `<li class="list-group-item"><p>${giveRatings(review.rating)}</p>
                    <p class="author-name">${review.author_name} says </p>
                    <p class="review-text">${review.text} says </p>
                    </li>`
    $(".google-ratings").append(list_element)
  }

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
