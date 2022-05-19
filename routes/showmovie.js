const   express = require('express'),
        router  = express.Router(),
        multer = require('multer'),
        path = require('path'),
        middleware = require('../middleware/midindex'),
        storage = multer.diskStorage({
                destination: function(req, file, callback){
                    callback(null,'./public/upload/');

                },
                filename: function(req, file, callback){
                    callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
                }

        }),
        imageFilter = function(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpng|png|gif)$/i)){
                return callback(new Error('Only jpg,jpng,png and gif.'),false);
            }
            callback(null, true);
        },
        upload = multer({storage: storage, fileFilter: imageFilter}),
        showmovie    = require('../models/showmovie');





router.get ( "/", function ( req, res ){
    showmovie.find({},function(err,allshowmovie){
        if(err){
            console.log(err)
        }
        else
        {
            res.render ( "showmovie/main.ejs",{showmovie:allshowmovie});	
        }




    })
});

router.get ( "/movie", function ( req, res ){
    showmovie.find({},function(err,allshowmovie){
        if(err){
            console.log(err)
        }
        else
        {
            res.render ( "showmovie/main2.ejs",{showmovie:allshowmovie});	
        }




    })
});

router.post("/", upload.single('image'), function(req,res){
    req.body.showmovie.author = {
        id: req.user._id,
        username: req.user.username
    };
    req.body.showmovie.image = '/upload/'+ req.file.filename;
    showmovie.create(req.body.showmovie,function(err, newlyAdded){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/showmovie");
        }
    });
});

router.put('/:id',upload.single('image'), function(req, res){
    if(req.file){
        req.body.showmovie.image = '/upload/'+req.file.filename;
    }
    showmovie.findByIdAndUpdate(req.params.id, req.body.showmovie, function(err, updatedmovie){
        if(err){
            console.log(err);
            res.redirect('/Pagemovie/');
        } else {
            res.redirect('/Pagemovie/'+req.params.id);
        }
    })
})
router.delete('/:id',middleware.checkMovieAdmin,  function(req,res){
    showmovie.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/showmovie/');
        } else {
            res.redirect('/showmovie/');
        }
    });
});
/*router.get('/showcima',function ( req, res ){
    if(err){
        console.log(err)
    }
    else
    {
        res.render ( "showmovie/main2.ejs",{showmovie:allshowmovie});	
    }
})*/

module.exports = router;
