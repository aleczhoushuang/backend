//'use strict';
const Game = require("../models/game.model.js");


exports.creategame = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Game
  const game = new Game({
    id_game: req.body.id_game,
    username: req.body.username,
    admin: req.body.admin,
    temps_jeu: req.body.temps_jeu,
    date_go: req.body.date_go
  });

  // Save Shotgun in the database
  Game.create(game, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event."
      });
    else res.send(data);
  });
};

// Find a single Game with an id_game
exports.findOnegame = (req, res) => {
  Game.findById(req.params.id_game, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Game with id ${req.params.id_game}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Game with id " + req.params.id_game
        });
      }
    } else res.send(data);
  });
};

// Update a Game by the id in the request

exports.updategame = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Game.updateById(
    req.params.id_game,
    new Game(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Game with id ${req.params.id_game}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Game with id " + req.params.id_game
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Game with the specified id in the request
exports.deletegame = (req, res) => {
  Game.remove(req.params.id_game, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Game with id ${req.params.id_game}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Game with id " + req.params.id_game
        });
      }
    } else res.send({ message: `Game was deleted successfully!` });
  });
};


