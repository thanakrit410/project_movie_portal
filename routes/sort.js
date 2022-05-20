const   express = require('express'),
        router  = express.Router(),
        showmovie    = require('../models/showmovie');






router.get('/aToz', function(req, res){
    console.log("Ok")
    showmovie.find({}).sort({'name':1}).exec(function(err, foundshowmovie){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('showmovie/main.ejs', {showmovie: foundshowmovie});
        }
    });
});

module.exports = router;