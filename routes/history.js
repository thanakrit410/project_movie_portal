const   express = require('express'),
        router  = express.Router(),
        History_onair = require('../models/history_onair');

router.get("/",async function ( req, res ){
    const data = await History_onair.find()
                      .populate({path: 'movie', model: 'showmovie'})
                      .populate({path: 'theater', model: 'Theater'})
    console.log(data)
    res.render ( "history/historyOnair.ejs" ,{data:data});	




})





module.exports = router;