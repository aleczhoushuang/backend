module.exports = app => {
    const event = require("../controllers/event.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Event
    router.post("/", event.createevent);
  
    // Retrieve a single Event with id
    router.get("/:cle", event.findOneevent);

    router.get("/inscrit/:cle", event.findOneeventInscrit);

    router.get("/user/:username", event.findevent);

    router.get("/user/user_cle/:username/:cle", event.finduniqueevent);

    router.get("/", event.findAll);
  
    // Update a Event with id
    router.put("/:cle", event.updateevent);

    router.put("/user/user_cle/:username/:cle", event.updateuniqueevent);
  
    // Delete a Event with id
    router.delete("/:cle", event.deleteevent);

    router.delete("/user/user_cle/:username/:cle", event.deleteuniqueevent);
  
    app.use('/61ff66f902894066a0a04f96d33ecb96/api/event', router);
  };