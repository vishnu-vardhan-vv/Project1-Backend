const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  ownerFirstName: String,
  ownerLastName: String,
  contactNumber: String,
  alternateNumber: String,
  locality: String,
  address: String,
  spaceType: String,
  petsAllowed: Boolean,
  preference: String,
  bachelors: String,
  furnishingType: String,
  bhk: Number,
  floor: String,
  nearestLandmark: String,
  washroomType: String,
  coolingFacility: String,
  carParking: Boolean,
  rent: Number,
  maintenance: Number,
  squareFeet: Number,
  appliances: [String],
  amenities: [String],
  about: String,
  photos: [String],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Property', propertySchema);
