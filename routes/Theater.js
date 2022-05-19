const   express = require('express'),
        router  = express.Router(),
        Movie = require('../models/showmovie'),
        History_onair =require('../models/history_onair'),
        Theater = require('../models/theater');
        
router.get ( "/", async function ( req, res ){
            const theaters = await Theater.find()
            res.render ( "showmovie/Theaters.ejs" ,{theaters:theaters});		
});
router.get ( "/:id", async function ( req, res ){
    const theaterID = req.params.id
    const movieoftheater = await History_onair.find({theater:theaterID})
                           .populate({path: 'movie', model: 'showmovie'})
                           .populate({path: 'theater', model: 'Theater'})
    console.log(movieoftheater)
    res.render ( "showmovie/TheaterID.ejs" ,{data:movieoftheater});	
    
    
    /*const post = await conPost.findById(req.params.postid)
                .populate({path: 'author_by', model: 'User'})
                .populate({path: 'comments', model: 'Comment',options:{ sort:{date : -1}} ,populate:({path: 'comment_by', model: 'User'})})*/
});
/*router.get ( "/:showmovie_id/cinema", async function ( req, res ){
    const MovieID = req.params.id
    const  theater = await Theater.movie_id.find(MovieID)
    res.render ( "showmovie/cinemaformovie.ejs" ,{theater:theater});		
});*/
router.post("/addmovieToOnair", async  function ( req, res ){
     const body = req.body


     const data_movie_onair = {
            open_time : body.opentime,
            onair_time: body.onairtime,
            onair_status:false,
            reserved:[],
            movie:  body.movieID,
            theater: body.theaterID



            
     }
     
     
     const result = History_onair.create(data_movie_onair)
     res.status(200).json(result)
     


})


router.post("/addtheater", async  function ( req, res ){
    const body = req.body


    const theater = await Theater.create(body)


    res.status(200).json(theater)
    


})
module.exports = router;
