module.exports = app => {
    const game = require("../controllers/game.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Game
    router.post("/", game.creategame);
  
    // Retrieve a single Game with id
    router.get("/:id", game.findOnegame);
  
    // Update a Game with id
    router.put("/:id", game.updategame);
  
    // Delete a Game with id
    router.delete("/:id", game.deletegame);
  
    app.use('/api/game', router);
  };