const mongoose =require('mongoose');

const TheaterSchema = new mongoose.Schema({
	name : String,
    maxSeat:Number

    
});
module.exports = mongoose.model('Theater',TheaterSchema);