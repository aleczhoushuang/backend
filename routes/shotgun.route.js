module.exports = app => {
  const shotgun = require("../controllers/shotgun.controller.js");

  var router = require("express").Router();

  // Create a new Shotgun
  router.post("/", shotgun.createshotgun);

  // Retrieve a single Shotgun with id
  router.get("/:cle", shotgun.findOneshotgun);

  router.get("/shotlist/nom/:nom_shotgun", shotgun.findshotgun);

  // Update a Shotgun with id
  router.put("/:cle", shotgun.updateshotgun);

  router.get("/", shotgun.findAll);

  // Delete a Shotgun with id
  router.delete("/:cle", shotgun.deleteshotgun);

   // Retrieve a single Shotgun with id
   router.get("/shotlist/:username", shotgun.findListshotgun);

   router.get("/id/:id_shotgun", shotgun.findidshotgun);

   router.get("/nextshot/:username", shotgun.findnextshotgun);

  app.use('/api/shotgun', router);
};