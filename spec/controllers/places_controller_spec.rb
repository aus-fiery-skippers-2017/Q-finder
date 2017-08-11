require 'rails_helper'

RSpec.describe PlacesController, type: :controller do
  let!(:place_test) { FactoryGirl.create(:place) }
  describe "GET #show" do
    it "returns http success" do
      get :show , params:{ id: place_test.map_id }
      expect(response).to have_http_status(:success)
    end
    it "returns json success for ajax" do
      get :show , params:{ id: place_test.map_id }, :format => :json
      expect(response).to have_http_status(:success)
    end
    it "redirects if @place is not found" do
      get :show, params:{ id: "0"}
      expect(response).to have_http_status(:redirect)
    end

    it "assigns the correct place as @place" do
      get :show, params: { id: place_test.map_id }
      expect(assigns(:place)).to eq(place_test)
    end

    it "renders the :show template" do
      get :show, params: { id: place_test.map_id }
      expect(response).to render_template(:show)
    end
  end

  describe "GET #index" do
    it "returns http success" do
      get :index ,params:{name: "Off the Bone Barbeque", lat: "32.7657187", lng: "-96.7922304" }
      p place_test
      expect(response).to have_http_status(:success)
    end

    it "redirects if name is nil" do
      get :index
      expect(response).to have_http_status(:redirect)
    end
    it "assigns the correct place as @place" do
      get :index ,params:{name: "Off the Bone Barbeque", lat: "32.7657187", lng: "-96.7922304" }
      expect(assigns(:location_name)).to eq("Off the Bone Barbeque")
    end

    it "assigns the correct place as @place" do
      get :index ,params:{name: "Off the Bone Barbeque", lat: "32.7657187", lng: "-96.7922304" }
      expect(assigns(:location)).to eq({lat: "32.7657187", lng: "-96.7922304"})
    end

    it "renders the :index template" do
      get :index ,params:{name: "Off the Bone Barbeque", lat: "32.7657187", lng: "-96.7922304" }
      expect(response).to render_template(:index)
    end
  end


end
