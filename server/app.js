const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/user');
const config = require('./config');
const { Strategy, ExtractJwt } = require('passport-jwt');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_tdd', { useMongoClient: true });

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


passport.initialize();
// Create the strategy for JWT
const strategy = new Strategy({
		// this is a config we pass to the strategy
	  // it needs to secret to decrypt the payload of the
	  // token.
	  secretOrKey: config.jwtSecret,
    // This options tells the strategy to extract the token
    // from the header of the request
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	},
	(payload, done) => {
		// payload is the object we encrypted at the route /api/token
    // We get the user id, make sure the user exist by looking it up
    User.findById(payload.id).then(user => {
    	if(user){
    		// make the user accessible in req.user
    		done(null, user);
    	} else {
    		done(new Error("User not found"));
    	}
    });
	}
);
//tell passport to use it
passport.use(strategy);

const authRoutes = require('./routes/auth');
const articlesRoutes = require('./routes/articles');
const commentsRoutes = require('./routes/comments');

app.use('/api', authRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/comments', commentsRoutes);

app.get(
	"/api/secret",
	// this is protecting the route and giving us access to req.user
  passport.authenticate('jwt', config.jwtSession),
  (req,res) => {
  	// send the user his own information
  	res.json(req.user);
  }
);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  // return the error message only in development mode
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err.message : {}
  });
});

module.exports = app;