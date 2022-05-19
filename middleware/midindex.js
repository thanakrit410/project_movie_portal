const   Comment = require('../models/comment'),
        showmovie = require('../models/showmovie');

const middlewareObj = {};

middlewareObj.checkMovieAdmin = function(req, res, next){
    if(req.isAuthenticated()){
        showmovie.findById(req.params.id, function(err, foundmovie){
            if(err){
                res.redirect('back');
            } else {
                if(foundmovie.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else {
                    req.flash('error', "You do not have permission to do this action!");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', "Please login");
        res.redirect('/login');    
    }
}

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)|| req.user.isAdmin){
                    next();
                } else {
                    req.flash('error', "You do not have permission to do this action!");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', "Please login");
        res.redirect('/login');    
    }
}


middlewareObj.isLoggedIN = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error','You need to login first');
	res.redirect('/login');
}
module.exports = middlewareObj;