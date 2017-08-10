require "rails_helper"

RSpec.describe "Routing to the application", :type => :routing do
  it "routes GET /place/1 to Places#show" do
    expect(:get => "/places/1").to route_to("places#show", id:"1" )
  end
end