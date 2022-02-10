module.exports = app => {
    const event = require("../controllers/event.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Event
    router.post("/", event.createevent);
  
    // Retrieve a single Event with id
    router.get("/:id", event.findOneevent);

    router.get("/", event.findAll);
  
    // Update a Event with id
    router.put("/:id", event.updateevent);
  
    // Delete a Event with id
    router.delete("/:id", event.deleteevent);
  
    app.use('/api/event', router);
  };