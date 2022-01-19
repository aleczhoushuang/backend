module.exports = app => {
  const shotgun = require("../controllers/shotgun.controller.js");

  var router = require("express").Router();

  // Create a new Shotgun
  router.post("/", shotgun.createshotgun);

  // Retrieve a single Shotgun with id
  router.get("/:id", shotgun.findOneshotgun);

  // Update a Shotgun with id
  router.put("/:id", shotgun.updateshotgun);

  // Delete a Shotgun with id
  router.delete("/:id", shotgun.deleteshotgun);

  app.use('/api/shotgun', router);
};