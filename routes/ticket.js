const { response } = require('express');

const   express = require('express'),
        router  = express.Router(),
        History_onair = require('../models/history_onair');

        
        
router.get ( "/:theaterID/:movieID", async function ( req, res ){
        const theaterID = req.params.theaterID
        const  movieID= req.params.movieID
        const  data = await History_onair.findOne({theater:theaterID,movie:movieID,onair_status:false})
                      .populate({path: 'movie', model: 'showmovie'})
                      .populate({path: 'theater', model: 'Theater'})
        console.log(data)
        console.log(theaterID+movieID)
    res.render ( "ticket/ticket.ejs" ,{data:data});		
});

router.post("/buyticket",async function ( req, res ){
        const body = req.body
        console.log(body)
        const theaterID = body.theaterID
        const movieID = body.movieID
        const  thismovie = await History_onair.findOne({theater:theaterID,movie:movieID,onair_status:false})
        thismovie.reserved.push(body.target_seat)
        thismovie.save()
        res.send("OK")


})

module.exports = router;