require 'rails_helper'

RSpec.describe Place, type: :model do
  before(:all) do
    Place.delete_all
    puts "I ONLY DID THIS ONCE!!!!!!!!"
    # place = build(:place)
  end
  describe "Attributes" do
    it "has a name" do
      place = build(:place)
      expect(place.name).to eq "Franklins"
    end

    it "has a map id" do
      place = build(:place)
      expect(place.map_id).to eq "asdklfjhwoiehfi203ry90wh9ef2ot24otih09whfg"
    end

    it "has a rating" do
      place = build(:place)
      expect(place.rating).to eq 5
    end
  end
  before(:all) do
    Place.delete_all
    puts "I ONLY DID THIS ONCE!!!!!!!!"
    # place = build(:place)
  end
  describe "Can create in database" do
    it "Save in to the database" do
      place = build(:place)
      p place
      expect{place.save}.to change{Place.count}.by(1)
    end

    it "can't save if Map ID match" do
      place = create(:place)
      place = Place.create({name:"whatever",map_id:"asdklfjhwoiehfi203ry90wh9ef2ot24otih09whfg"})
      expect(place.errors.messages[:map_id]).to_not be_empty
    end

  end

end
