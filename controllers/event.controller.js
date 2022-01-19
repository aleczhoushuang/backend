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
    id: req.body.id,
    username: req.body.username,
    admin: req.body.admin,
    info: req.body.info,
    temps_shot: req.body.temps_shot
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

// Find a single Event with an id
exports.findOneevent = (req, res) => {
  Event.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update an Event by the id in the request

exports.updateevent = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Event.updateById(
    req.params.id,
    new Event(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Event with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Event with the specified id in the request
exports.deleteevent = (req, res) => {
  Event.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Event with id " + req.params.id
        });
      }
    } else res.send({ message: `Event was deleted successfully!` });
  });
};


