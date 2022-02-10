module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.createuser);
  
    // Retrieve a single user with username
    router.get("/:username", user.findOneuser);

    router.get("/", user.findAll);
  
    // Update a user with username
    router.put("/:username", user.updateuser);
  
    // Delete a user with username
    router.delete("/:username", user.deleteuser);
  
    app.use('/api/user', router);
  };