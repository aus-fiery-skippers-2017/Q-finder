class PlacesController < ApplicationController
  def show
    @place = Place.find_or_create_by(map_id:params[:id])

    if @place.id == nil
      @place.update_attributes(params_data)
      @place.save
    end

    if @place.invalid?
      redirect_to "/"
    elsif request.xhr?
      render json: @place
    else
      @place
      @reviews = Review.includes(:user).where(place_id:@place.id).map do |review|
        {review:review.review,email:review.user_email,rating:review.rating}
      end

    render layout: "place"
    end
  end

  def index
    if params[:name].nil?
      redirect_to "/"
    end
    @location_name = params[:name]
    @location = {lat: params[:lat], lng: params[:lng]}
  end

  private
  def params_data
    params.permit(:name,:lat,:lng)
  end
end
