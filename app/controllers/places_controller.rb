class PlacesController < ApplicationController
  def show
    @place = Place.find_or_create_by(map_id:params[:id])
    if @place.id == nil
      puts "this is params data *********************************************************"
      p params_data
      @place.update_attributes(params_data)
      @place.save

    end
    p params
    if request.xhr?

      render json: @place
    else
    @place
    render layout: "place"
    end
  end

  def index
    @location_name = params[:name]
    @location = {lat: params[:lat], lng: params[:lng]}
  end

  private
  def params_data
    params.permit(:name,:lat,:lng)
  end
end
