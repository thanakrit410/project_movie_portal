const mongoose =require('mongoose');

const historyOnairSchema = new mongoose.Schema({

    open_time : Date,
    onair_time: Date,
    onair_status:Boolean,
    reserved:[],
    movie: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'showmovie'
            },
    theater:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Theater'
        },
    
});
module.exports = mongoose.model('History',historyOnairSchema);