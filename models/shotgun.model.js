const sql = require("./db.js");

// constructor
const Shotgun = function(shotgun) {
  this.id = shotgun.id;
  this.nom_shotgun= shotgun.nom_shotgun;
  this.date_shotgun = shotgun.date_shotgun;
  this.nb_place = shotgun.nb_place;
  this.photo_shotgun = shotgun.photo_shotgun
};

Shotgun.create = (newShotgun, result) => {
  sql.query("INSERT INTO shotgun SET ?", newShotgun, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Shotgun: ", { id: res.insertId, ...newShotgun });
    result(null, { id: res.insertId, ...newShotgun });
  });
};

Shotgun.findById = (id, result) => {
    sql.query("SELECT * FROM shotgun WHERE id = ?", id.substring(1), (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found shotgun: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Shotgun with the id
      result({ kind: "not_found" }, null);
    });
};


Shotgun.updateById = (id, shotgun, result) => {
  sql.query(
    "UPDATE shotgun SET nom_shotgun = ?, date_shotgun = ?, nb_place = ?, photo_shotgun = ? WHERE id = ?",
    [shotgun.nom_shotgun, shotgun.date_shotgun, shotgun.nb_place, shotgun.photo_shotgun, id.substring(1) ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Shotgun with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated shotgun: ", { id: id, ...shotgun });
      result(null, { id: id, ...shotgun });
    }
  );
};

Shotgun.remove = (id, result) => {
  sql.query("DELETE FROM shotgun WHERE id = ?", id.substring(1), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Shotgun with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted shotgun with id: ", id.substring(1));
    result(null, res);
  });
};


module.exports = Shotgun;
