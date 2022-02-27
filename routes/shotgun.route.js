module.exports = app => {
  const shotgun = require("../controllers/shotgun.controller.js");

  var router = require("express").Router();

  // Create a new Shotgun
  router.post("/", shotgun.createshotgun);

  // Retrieve a single Shotgun with id
  router.get("/:id", shotgun.findOneshotgun);

  router.get("/:nom_shotgun", shotgun.findshotgun);

  // Update a Shotgun with id
  router.put("/:id", shotgun.updateshotgun);

  router.get("/", shotgun.findAll);

  // Delete a Shotgun with id
  router.delete("/:id", shotgun.deleteshotgun);

   // Retrieve a single Shotgun with id
   router.get("/shotlist/:username", shotgun.findListshotgun);

  app.use('/api/shotgun', router);
};