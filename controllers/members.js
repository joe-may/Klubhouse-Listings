const Member = require("../models/member");
const Listing = require('../models/new');

module.exports = {
  index,
  addFact,
  delFact,
  new: newListing,
  create,

};
function index(req, res, next) {
  console.log(req.query);
  // Make the query object to use with member.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  // Default to sorting by name
  let sortKey = req.query.sort || "name";
  Member.find(modelQuery)
    .sort(sortKey)
    .exec(function (err, members) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render("members/index", {
        members,
        user: req.user,
        name: req.query.name,
        sortKey,
      });
    });
}

function newListing(req, res) {
  // newListing = new Listing();
  console.log('helo');
  res.render('members/new', { title: 'ADD listing' })
}
function create(req, res) {
  // for (let key in req.body) {
  //   if (req.body[key] === '') delete req.body[key]
  // }
  // const listing = new Listing(req.body)
  // listing.save(function(err) {
  //   if (err) return res.redirect('/members/new')
  //   res.redirect(`/members`)
  // })
}

function addFact(req, res, next) {
    req.user.facts.push(req.body);
    req.user.save(function(err) {
      res.redirect('/members');
    });
  }

  function delFact(req, res, next) {
    Member.findOne({'facts._id': req.params.id}, function(err, member) {
      student.facts.id(req.params.id).remove();
      member.save(function(err) {
        res.redirect('/members');
      });
    });
  }
