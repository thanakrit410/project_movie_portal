const mongoose =require('mongoose');

const movieSchema = new mongoose.Schema({
	name:String,
	date:String,
	image:String,
    rate:String,
	category:String,
	timemovie:String,
	Synopsis:String,
	trailer:String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    Comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }


    ],
    theaters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Theater'
        }


    ],
    Showtime : [
            {
                type:String
            }
    ],
    Cinema : [
        {
            type:String
        }
    ]
    
});
module.exports = mongoose.model('showmovie',movieSchema);