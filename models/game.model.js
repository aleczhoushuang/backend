const sql = require("./db.js");

// constructor
const Game = function(game) {
  this.id = game.id;
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

    console.log("created Game: ", { id: res.insertId, ...newGame });
    result(null, { id: res.insertId, ...newGame });
  });
};

Game.findById = (id, result) => {
    sql.query("SELECT * FROM game WHERE id = ?", id.substring(1), (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found game: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Game with the id
      result({ kind: "not_found" }, null);
    });
};


Game.updateById = (id, game, result) => {
  sql.query(
    "UPDATE game SET username = ?, admin = ?, temps_jeu = ?, date_go = ? WHERE id = ?",
    [game.username, game.admin, game.temps_jeu, game.date_go, id.substring(1) ],
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

      console.log("updated game: ", { id: id, ...game });
      result(null, { id: id, ...game });
    }
  );
};

Game.remove = (id, result) => {
  sql.query("DELETE FROM game WHERE id = ?", id.substring(1), (err, res) => {
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

    console.log("deleted game with id: ", id.substring(1));
    result(null, res);
  });
};


module.exports = Game;
