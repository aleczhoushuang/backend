const Shotgun = require("../models/shotgun.model.js");

exports.createshotgun = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Shotgun
  const shotgun = new Shotgun({
    id: req.body.id,
    nom_shotgun: req.body.nom_shotgun,
    date_shotgun: req.body.date_shotgun,
    nb_place: req.body.nb_place,
    photo_shotgun: req.body.photo_shotgun
  });

 // Save Shotgun in the database
 Shotgun.create(shotgun, (err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the shotgun."
    });
  else res.send(data);
});
};

// Find a single Shotgun with an id
exports.findOneshotgun = (req, res) => {
Shotgun.findById(req.params.id, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Shotgun with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Shotgun with id " + req.params.id
      });
    }
  } else res.send(data);
});
};

// Update a Shotgun by the id in the request
exports.updateshotgun = (req, res) => {
// Validate Request
if (!req.body) {
  res.status(400).send({
    message: "Content can not be empty!"
  });
}
Shotgun.updateById(
  req.params.id,
  new Shotgun(req.body),
  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Shotgun with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Shotgun with id " + req.params.id
        });
      }
    } else res.send(data);
  }
);
};

// Delete a Shotgun with the specified id in the request
exports.deleteshotgun = (req, res) => {
Shotgun.remove(req.params.id, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Shotgun with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete Shotgun with id " + req.params.id
      });
    }
  } else res.send({ message: `Shotgun was deleted successfully!` });
});
};

exports.findAll = (req, res) => {
  const id = req.query.id;

  Shotgun.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shotgun."
      });
    else res.send(data);
  });
};

// Find a single Shotgun with a username
exports.findListshotgun = (req, res) => {
  Shotgun.findByUsername(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Shotgun with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Shotgun with username " + req.params.username
        });
      }
    } else res.send(data);
  });
  };