module.exports = app => {
    const game = require("../controllers/game.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Game
    router.post("/", game.creategame);
  
    // Retrieve a single Game with id
    router.get("/:id_game", game.findOnegame);
  
    // Update a Game with id
    router.put("/:id_game", game.updategame);
  
    // Delete a Game with id
    router.delete("/:id_game", game.deletegame);
  
    app.use('/api/game', router);
  };