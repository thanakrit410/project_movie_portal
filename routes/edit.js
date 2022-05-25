const   express = require('express'),
        router  = express.Router(),
        middleware = require('../middleware/midindex'),
        showmovie    = require('../models/showmovie');


router.get("/:id",function(req, res){
            showmovie.findById(req.params.id, function(err, foundmovie){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("aom")
                    res.render('showmovie/edit.ejs',{showmovie:foundmovie})
                }
            });
        
});

module.exports = router;
        
               