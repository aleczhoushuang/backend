const Event = require('../models/event.model.js');

exports.createevent = (req, res) => {
  // Validate request
  //if (!req.body) {
  //  res.status(400).send({
  //    message: "Content can not be empty!"
  //  });
  //  return;
 // }
  // Create an Event
  const event = new Event({
    id_event: req.body.id_event,
    id_game: req.body.id_game,
    id_user: req.body.id_user,
    cle: req.body.cle,
    username: req.body.username,
    admin: req.body.admin,
    age: req.body.age,
    telephone: req.body.telephone,
    genre: req.body.genre,
    custom: req.body.custom,
    temps_shot: req.body.temps_shot,
    visible: req.body.visible
  });

  // Save Event in the database
  Event.create(event, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event."
      });
    else res.send(data);
  });
};

// Find a single Event with a cle
exports.findOneevent = (req, res) => {
  Event.findByCle(req.params.cle, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with cle ${req.params.cle}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with cle " + req.params.cle
        });
      }
    } else res.send(data);
  });
};

exports.findevent = (req, res) => {
  Event.findByUsername(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with username " + req.params.username
        });
      }
    } else res.send(data);
  });
};

exports.finduniqueevent = (req, res) => {
  Event.findByUsername_cle(req.params.username, req.params.cle, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with username ${req.params.username} and cle ${req.params.cle}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with username " + req.params.username
        });
      }
    } else res.send(data);
  });
};

// Update an Event by the cle in the request

exports.updateevent = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Event.updateByCle(
    req.params.cle,
    new Event(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with cle ${req.params.cle}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Event with cle " + req.params.cle
          });
        }
      } else res.send(data);
    }
  );
};

exports.updateuniqueevent = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Event.updateByUsername_cle(
    req.params.cle, req.params.uername,
    new Event(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with cle ${req.params.cle}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Event with cle " + req.params.cle
          });
        }
      } else res.send(data);
    }
  );
};

exports.findAll = (req, res) => {
  const cle = req.query.cle;

  Event.getAll(cle, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    else res.send(data);
  });
};

// Delete an Event with the specified cle in the request
exports.deleteevent = (req, res) => {
  Event.remove(req.params.cle, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with cle ${req.params.cle}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Event with cle " + req.params.cle
        });
      }
    } else res.send({ message: `Event was deleted successfully!` });
  });
};

exports.deleteuniqueevent = (req, res) => {
  Event.removeunique(req.params.cle, req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with cle ${req.params.cle}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Event with cle " + req.params.cle
        });
      }
    } else res.send({ message: `Event was deleted successfully!` });
  });
};


