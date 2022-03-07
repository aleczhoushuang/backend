const sql = require("./db.js");

// constructor
const Game = function(game) {
  this.id_game = game.id_game;
  this.id_user = game.id_user;
  this.username= game.username;
  this.admin = game.admin;
  this.temps_jeu = game.temps_jeu;
  this.date_go = game.date_go;
};

Game.create = (newGame, result) => {
  sql.query("INSERT INTO game SET ?", newGame, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Game: ", { id_game: res.insertId_game, ...newGame });
    result(null, { id_game: res.insertId_game, ...newGame });
  });
};

Game.findById = (id_game, result) => {
    sql.query("SELECT * FROM game WHERE id_game = ?", id_game.substring(1), (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found game: ", res);
        result(null, res);
        return;
      }
  
      // not found Game with the id
      result({ kind: "not_found" }, null);
    });
};


Game.updateById = (id_game, game, result) => {
  sql.query(
    "UPDATE game SET username = ?, admin = ?, temps_jeu = ?, date_go = ? WHERE id_game = ?",
    [game.username, game.admin, game.temps_jeu, game.date_go, id_game.substring(1) ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Game with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated game: ", { id_game: id_game, ...game });
      result(null, { id_game: id_game, ...game });
    }
  );
};

Game.remove = (id_game, result) => {
  sql.query("DELETE FROM game WHERE id_game = ?", id_game.substring(1), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Game with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted game with id_game: ", id_game.substring(1));
    result(null, res);
  });
};


module.exports = Game;
