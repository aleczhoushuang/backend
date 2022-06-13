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
    cle: req.body.cle,
    id_user: req.body.id_user,
    nom_shotgun: req.body.nom_shotgun,
    date_shotgun: req.body.date_shotgun,
    nb_place: req.body.nb_place,
    photo_shotgun: req.body.photo_shotgun,
    email: req.body.email,
    age: req.body.age,
    telephone: req.body.telephone,
    genre: req.body.genre,
    custom: req.body.custom,
    custom_text: req.body.custom_text,
    username: req.body.username,
    id_shotgun: req.body.id_shotgun,
    description: req.body.description
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

// Find a single Shotgun with a cle
exports.findOneshotgun = (req, res) => {
Shotgun.findByCle(req.params.cle, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Shotgun with cle ${req.params.cle}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Shotgun with cle " + req.params.cle
      });
    }
  } else res.send(data);
});
};

// Find a single Shotgun with a name
exports.findshotgun = (req, res) => {
  Shotgun.findByNom(req.params.nom_shotgun, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Shotgun with nom ${req.params.nom_shotgun}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Shotgun with nom " + req.params.nom_shotgun
        });
      }
    } else res.send(data);
  });
  };

  exports.findnextshotgun = (req, res) => {
    Shotgun.findByNext(req.params.username, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found next Shotgun of ${req.params.username}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving next Shotgun nom " + req.params.username
          });
        }
      } else res.send(data);
    });
    };

// Update a Shotgun by the cle in the request
exports.updateshotgun = (req, res) => {
// Validate Request
if (!req.body) {
  res.status(400).send({
    message: "Content can not be empty!"
  });
}
Shotgun.updateByCle(
  req.params.cle,
  new Shotgun(req.body),
  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Shotgun with cle ${req.params.cle}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Shotgun with cle " + req.params.cle
        });
      }
    } else res.send(data);
  }
);
};

// Delete a Shotgun with the specified cle in the request
exports.deleteshotgun = (req, res) => {
Shotgun.remove(req.params.cle, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Shotgun with cle ${req.params.cle}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete Shotgun with cle " + req.params.cle
      });
    }
  } else res.send({ message: `Shotgun was deleted successfully!` });
});
};

exports.findAll = (req, res) => {
  const cle = req.query.cle;

  Shotgun.getAll(cle, (err, data) => {
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

  exports.findidshotgun = (req, res) => {
    Shotgun.findById(req.params.id_shotgun, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Shotgun with username ${req.params.id_shotgun}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Shotgun with username " + req.params.id_shotgun
          });
        }
      } else res.send(data);
    });
    };