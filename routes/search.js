const   express = require('express'),
        router  = express.Router(),
        showmovie    = require('../models/showmovie');



/*router.post('/', function(req, res){
    let keyword = req.body.keyword;
    res.redirect("/search/"+keyword);
});*/

router.post('/keyword', function(req, res){
    console.log("dsadas")
    let keyword = req.body.keyword;
    showmovie.find({name :{$regex : keyword, $options :"i"}}).exec(function(err, foundshowmovie){
        if(err){
            console.log(err);
        }
        else{
            res.render('showmovie/main.ejs', {showmovie: foundshowmovie});
        }
    });
});

router.get('/aToz', function(req, res){
    console.log("Ok")
    res.json({})
    /*showmovie.find({}).sort({'name':1}).exec(function(err, foundshowmovie){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('showmovie/main.ejs', {showmovie: foundshowmovie});
        }
    });*/
});

module.exports = router;