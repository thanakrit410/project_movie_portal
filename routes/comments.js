const   express = require('express'),
        router  = express.Router({mergeParams:true}),
        showmovie    = require('../models/showmovie'),
        Comment = require('../models/comment'),
		middleware = require('../middleware/midindex');


router.get("/addnewcomment",middleware.isLoggedIN,function(req,res){
	showmovie.findById(req.params.id, function(err, foundmovie){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render('comments/addnewcomment.ejs', {showmovie:foundmovie})
		}

	});
});

router.post("/",middleware.isLoggedIN, function(req, res){
	showmovie.findById(req.params.id, function(err, foundmovie){
		if(err)
		{
			console.log(err);
		}
		else
		{	
			
			Comment.create(req.body.comment,function(err, comment){
				if(err)
				{
					console.log(err);
				}
				else
				{	
					
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.movieID = req.params.id;
					comment.save();
					foundmovie.Comments.push(comment);
					foundmovie.save();
					res.redirect('/Pagemovie/'+ foundmovie._id);
				}
			});
		}
	});
});
router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('comments/editcom.ejs',{showmovie_id: req.params.id, comment: foundComment})
        }
    });
});

router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/Pagemovie/'+req.params.id);
        }
    });
});

router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash('error','There are something wrong!!!')
            res.redirect('/Pagemovie/'+req.params.id);
        } else {
            req.flash('success','Your comment was deleted.');
            res.redirect('/Pagemovie/'+req.params.id);
        }
    });
});



module.exports = router;