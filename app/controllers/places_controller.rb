class PlacesController < ApplicationController
  def show
    @place = Place.find_or_create_by(map_id:params[:id])
    if @place.id == nil
      data = JSON.parse(params[:data])
      @place.name = data["name"]
      @place.save
    end
    if request.xhr?
      render json: @place
    end
  end

  def index
  end
end
