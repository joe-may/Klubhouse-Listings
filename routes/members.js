var router = require('express').Router();
var membersCtrl = require('../controllers/members');



function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

// GET /members
router.get('/members', membersCtrl.index);
router.get('/members/newest', membersCtrl.new);
// router.get('/:id', flightsCtrl.show)
// router.post('/', flightsCtrl.create)

// POST /facts
// We will already have access to the logged in member on
// the server, therefore do not use: /members/:id/facts
router.post('/facts', isLoggedIn, membersCtrl.addFact);

// DELETE /facts/:id
router.delete('/facts/:id', membersCtrl.delFact);

module.exports = router;
