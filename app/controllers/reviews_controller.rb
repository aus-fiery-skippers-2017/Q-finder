class ReviewsController < ApplicationController
    # before_action :authenticate_user!

  def new
    @place = Place.find(params[:place_id])
    @review = Review.new
    if user_signed_in?
      if request.xhr?
        render :new, layout: false
      else
      end
    else
      redirect_to new_user_session_path, status:301
    end
  end

  def create
    @place = Place.find(params[:place_id])
    @review = @place.reviews.new(review_params)
    @review.user_id = current_user.id

    if request.xhr?
     if @review.save
      @place.update_reviews
      render json: {review:@review.review,email:@review.user_email,rating:@review.rating}.to_json
    else
        status 422
        "review did not save!"
     end
    else
      if @review.save
        redirect_to place_path(@place)
      else
        render :new, layout: false
      end
    end

  end

  def edit
    @place = Place.find(params[:place_id])
    render :new
  end

  def update
    @place = Place.find(params[:place_id])
    @reviews = @place.reviews.find(params[:id])
    binding.pry
    render json: {review:@review.review, rating:@review.rating}.to_json
  end

  def destroy

    @place = Place.find(params[:place_id])
    #binding.pry
    @review = @place.reviews.find(params[:id])
    @review.destroy
    redirect_to edit_user_registration_path
  end

  private
  def review_params
    params.require(:review).permit(:rating, :review)
  end
end
