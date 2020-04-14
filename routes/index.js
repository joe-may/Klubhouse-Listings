var router = require('express').Router();
var passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/members');
});

///// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

 // Google OAuth callback route
 router.get('/Kluboauth', passport.authenticate(
  'google',
  {
    successRedirect : '/members',
    failureRedirect : '/members'
  }
));

module.exports = router;