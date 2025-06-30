const Location = require('../models/locationModel');

// Create location
const createLocation = async (req, res) => {
  const { locationName, latitude, longitude } = req.body;

  if (!locationName || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const newLocation = new Location({ locationName, latitude, longitude });
    await newLocation.save();
    res.status(201).json({ message: "Location created", data: newLocation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all locations
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json({ data: locations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createLocation, getAllLocations };
