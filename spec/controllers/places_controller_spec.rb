require 'rails_helper'

RSpec.describe PlacesController, type: :controller do
  let!(:place_test) { FactoryGirl.create(:place) }
  describe "GET #show" do
    it "returns http success" do
      get :show
      expect(response).to have_http_status(:success)
    end

    it "assigns the correct place as @place" do
      get :show, params: { id: place.id }
      expect(assigns(:place)).to eq(place_test)
    end

    it "renders the :show template" do
      get :show, params: { id: place.id }
      expect(response).to render_template(:show)
    end
  end

end
