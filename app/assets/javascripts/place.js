//= require jquery
function addQFinderRatings(reviews)  {
  for (var review of reviews) {
    console.log(review)
    list_element = `<li class="list-group-item"><p>${giveRatings(review.rating)}</p>
                    <p class="author-name">${review.email} says </p>
                    <p class="review-text">${review.review} says </p>
                    </li>`
    $(".q-finder-ratings").append(list_element)
  }
}

function map_init() {
        var map = new google.maps.Map(document.getElementById('map-container'), {
          center: this_place,
          zoom: 15
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.getDetails({
          placeId: place_id
        }, function(place, status) {


          $("#rating").html(giveRatings(place.rating))
          $("#phone_number").html(place.formatted_phone_number)
          $("#Hours").html(format_hours(place.opening_hours.weekday_text))
          $("#address").html(place.formatted_address)

          addQFinderRatings(qFinderReviews)
          addGoogleRatings(place.reviews)
          addGooglePictures(place.photos)

          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
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
    list_element = `<li class="list-group-item"><p>${giveRatings(review.rating)}</p>
                    <p class="author-name">${review.author_name} says </p>
                    <p class="review-text">${review.text} says </p>
                    </li>`
    $(".google-ratings").append(list_element)
  }
}

function addGooglePictures(pictures){

  for (var y = 0; y < pictures.length; y+=2) {
      picture = `<div class="col-lg-6 col-md-6 col-sm-6 center-cropped" style="background-image: url(${pictures[y].getUrl({maxWidth:300,maxHeight:300})});"> </div>
      <div class="col-lg-6 col-md-6 col-sm-6 center-cropped" style="background-image: url(${pictures[y+1].getUrl({maxWidth:200,maxHeight:200})});"></div>
      <div class="clearfix"></div>`
      $("#pictures").append(picture)
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
    map_init()

});

$(document).ready(function(event){

  $(".q-finder-review-button").on("submit",".new_review",function(event){
    event.preventDefault();
    var $newReview = $(this);
    var $reviewData = $(this).serialize();

    $.ajax({
      method: $newReview.attr("method"),
      url: $newReview.attr("action"),
      data: $reviewData,
    })

    .done(function(newReviewData){
       $newReview.hide();
    })
  })

  $("#post-review").on("click",function(event){
    event.preventDefault();
    $button = $(this)
    $.ajax({
      method:"GET",
      url:$(this).attr("href")
    })
    .done(function(formData,textStatus,jqXHR){
      console.log(jqXHR)
      $(".q-finder-review-button").append(formData)
      $button.hide()
    })
  })
})



