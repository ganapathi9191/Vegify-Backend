const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationName: { 
    type: String, 
    required: true 
},
  latitude: {
     type: Number,
      required: true 
    },
  longitude: { 
    type: Number, 
    required: true 
}
});

module.exports = mongoose.model('Location', locationSchema);
