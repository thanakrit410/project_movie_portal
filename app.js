const express  = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require('mongoose'),
	  passport    = require('passport'),
	  LocalStrategy = require('passport-local'),
	  showmovie = require('./models/showmovie'),
      Comment   = require('./models/comment'),
	  flash       = require('connect-flash'),
	  methodOverride = require('method-override'),
	  User     = require('./models/user'),
	  seedDB   = require('./seeds.js');
	  
	 
const   indexRoutes = require('./routes/index'),
		TheaterRoutes = require('./routes/Theater'),
	  	showmovieRoutes = require('./routes/showmovie'),
		PagemovieRoutes = require('./routes/Pagemovies'),
		AddmovieRoutes = require('./routes/Addmovie'),
		ticketRoutes	= require('./routes/ticket'),
		searchRoutes	= require('./routes/search'),
		sortRoutes     = require('./routes/sort'),
		historyRoutes     = require('./routes/history'),
		editRoutes = require('./routes/edit'),
	  	commentRoutes = require('./routes/comments');


//mongoose.connect('mongodb://localhost/APmovie');
mongoose.connect('mongodb+srv://aomsin191144:191144Zs@cluster0.15o8u.mongodb.net/?retryWrites=true&w=majority');
app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));
//seedDB({});
app.use(flash());
app.use(express.json());
app.use(methodOverride('_method'));

app.use(require('express-session')({
    secret: 'secret word',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
	next();
});


app.use('/', indexRoutes);
app.use('/showmovie', showmovieRoutes);
app.use('/Pagemovie/:id', PagemovieRoutes);
app.use('/Addmovie', AddmovieRoutes);
app.use('/ticket',ticketRoutes);
app.use('/Pagemovie/:id/Comments', commentRoutes);
app.use('/Theater',TheaterRoutes);
app.use('/search',searchRoutes);
app.use('/sort',sortRoutes);
app.use('/history',historyRoutes);
app.use('/edit', editRoutes);




app.listen(4000,function(){
	console.log("Activated");
})