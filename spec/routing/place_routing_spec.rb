require "rails_helper"

RSpec.describe "Routing to the application", :type => :routing do
  it "routes GET /place/1 to Places#show" do
    expect(:get => "/places/1").to route_to("places#show", id:"1" )
  end

  it "routes GET /place/?name= to Places#show" do
    expect(:get => "/places?name=Austin&lat=30.267153&lng=-97.74306079999997").to route_to("places#index",name:"Austin",lat:"30.267153",lng:"-97.74306079999997")
  end
end
