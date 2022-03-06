//'use strict';
const User = require("../models/user.model.js");


exports.createuser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = new User({
    id_user : req.body.id_user,
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    photo: req.body.photo,
    bio: req.body.bio,
    age: req.body.age,
    telephone: req.body.telephone,
    genre: req.body.genre,
    lieu: req.body.lieu
  });   
  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Find a single User with a username
exports.findOneuser = (req, res) => {
  User.findByName(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with username " + req.params.username
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const username = req.query.username;

  User.getAll(username, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving username."
      });
    else res.send(data);
  });
};

// Update a User by the username in the request

exports.updateuser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.updateByName(
    req.params.username,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with username ${req.params.username}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with username " + req.params.username
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified username in the request
exports.deleteuser = (req, res) => {
  User.remove(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with username " + req.params.username
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};


