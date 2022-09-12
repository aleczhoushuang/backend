module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.createuser);
    router.post("/login/", user.loginuser);
  
    // Retrieve a single user with username
    router.get("/:username", user.findOneuser);

    router.get("/", user.findAll);
  
    // Update a user with username
    router.put("/:username", user.updateuser);
  
    // Delete a user with username
    router.delete("/:username", user.deleteuser);
  
    app.use('/61ff66f902894066a0a04f96d33ecb96/api/user', router);
  };