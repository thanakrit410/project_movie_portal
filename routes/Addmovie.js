const   express = require('express'),
        Movie = require('../models/showmovie'),
        router  = express.Router();


router.get ( "/", function ( req, res ){
    res.render ( "showmovie/Addmovie.ejs" );		
});

router.post("/Showtime", async function ( req, res ){
         body= req.body
        console.log(body);
        const movie = await Movie.findById(body.MovieID)
        movie.Showtime.push(body.target)
        movie.save()
        res.status(200).send("OK")
})
router.post("/Cinema", async function ( req, res ){
    body= req.body
   console.log(body);
   const movie1 = await Movie.findById(body.MovieID1)
   movie1.Cinema.push(body.target)
   movie1.save()
   res.status(200).send("OK")
})







module.exports = router;