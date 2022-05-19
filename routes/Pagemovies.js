const theater = require('../models/theater');

const   express = require('express'),
        router  = express.Router({mergeParams:true}),
        middleware = require('../middleware/midindex'),
        History_onair = require('../models/history_onair'),
        showmovie    = require('../models/showmovie');






router.get ("/",async function(req, res){
    const movieID = req.params.id
    showmovie.findById(movieID).populate('Comments').exec(async function(err, foundmovie){
        if(err){
            console.log(err);
        }   
        else
        {
            const movieoftheater = await History_onair.find({movie:movieID})
                           .populate({path: 'movie', model: 'showmovie'})
                           .populate({path: 'theater', model: 'Theater'})
            /*console.log(movieoftheater)*/
            let theatersOnair = []
            movieoftheater.forEach(function(item){
                    console.log('item',item.theater)
                    theatersOnair.push(item.theater)


            })

            console.log("24"+theatersOnair)
            res.render('showmovie/showmovie.ejs',{showmovie:foundmovie,theaters:theatersOnair})
        }
    });



});

router.get ("/:theaterID",function(req, res){
    showmovie.findById(req.params.id).populate('Comments').exec(function(err, foundmovie){
        if(err){
            console.log(err);
        }   
        else
        {
            res.render('showmovie/showmovie.ejs',{showmovie:foundmovie})
        }
    });



});

router.get("/edit",middleware.checkMovieAdmin,function(req, res){
    showmovie.findById(req.params.id, function(err, foundmovie){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('showmovie/edit.ejs',{showmovie:foundmovie})
        }
    });

});
router.get("/edit",middleware.checkMovieAdmin,function(req, res){
    showmovie.findById(req.params.id, function(err, foundmovie){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('showmovie/edit.ejs',{showmovie:foundmovie})
        }
    });

});



module.exports = router;