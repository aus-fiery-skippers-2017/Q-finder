class PlacesController < ApplicationController
  def show
    @place = Place.find_or_create_by(map_id:params[:id])
    if @place.id == nil
      @place.name = params_data
      @place.save
    end
    if request.xhr?
      render json: @place
    end
  end

  def index
  end

  private
  def params_data
    params.permit(:data)
  end
end
