const sql = require("./db.js");

// constructor
const Shotgun = function(shotgun) {
  this.cle = shotgun.cle;
  this.id_user = shotgun.id_user;
  this.nom_shotgun= shotgun.nom_shotgun;
  this.date_shotgun = shotgun.date_shotgun;
  this.nb_place = shotgun.nb_place;
  this.photo_shotgun = shotgun.photo_shotgun;
  this.email = shotgun.email;
  this.age = shotgun.age;
  this.telephone = shotgun.telephone;
  this.genre = shotgun.genre;
  this.custom = shotgun.custom;
  this.custom_text = shotgun.custom_text;
  this.username = shotgun.username;
  this.id_shotgun = shotgun.id_shotgun;
  this.description = shotgun.description
};


Shotgun.create = (newShotgun, result) => {
  sql.query("INSERT INTO shotgun SET ?", newShotgun, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      sql.query("SELECT cle FROM shotgun WHERE id_shotgun = ?", id_shotgun.substring(1), (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found shotgun: ", res);
        result(null, res);
        return;
      }
  
      // not found Shotgun with the cle
      result({ kind: "not_found" }, null);
      });
    }

    console.log("created Shotgun: ", { cle: res.insertCle, ...newShotgun });
    result(null, { cle: res.insertCle, ...newShotgun });
  });
};

Shotgun.findByCle = (cle, result) => {
    sql.query("SELECT * FROM shotgun WHERE cle = ?", cle.substring(1), (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found shotgun: ", res);
        result(null, res);
        return;
      }
  
      // not found Shotgun with the cle
      result({ kind: "not_found" }, null);
    });
};

Shotgun.findByNom = (nom_shotgun, result) => {
  sql.query("SELECT * FROM shotgun WHERE nom_shotgun = ?", nom_shotgun.substring(1), (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found shotgun: ", res);
      result(null, res);
      return;
    }

    // not found Shotgun with the nom
    result({ kind: "not_found" }, null);
  });
};


Shotgun.updateByCle = (cle, shotgun, result) => {
  sql.query(
    "UPDATE shotgun SET nom_shotgun = ?, date_shotgun = ?, nb_place = ?, photo_shotgun = ?, email=?, age=?, telephone=?, genre=?, custom=?, custom_text=?, username=?, description=? WHERE cle = ?",
    [shotgun.nom_shotgun, shotgun.date_shotgun, shotgun.nb_place, shotgun.photo_shotgun, shotgun.email, shotgun.age, shotgun.telephone, shotgun.genre, shotgun.custom, shotgun.custom_text, shotgun.username, shotgun.description, cle.substring(1) ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Shotgun with the cle
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated shotgun: ", { cle: cle, ...shotgun });
      result(null, { cle: cle, ...shotgun });
    }
  );
};

Shotgun.remove = (cle, result) => {
  sql.query("DELETE FROM shotgun WHERE cle = ?", cle.substring(1), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Shotgun with the cle
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted shotgun with cle: ", cle.substring(1));
    result(null, res);
  });
};

Shotgun.getAll = (cle, result) => {
  let query = "SELECT * FROM shotgun";

  if (cle) {
    query += ` WHERE cle LIKE '%${cle}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cle: ", res);
    result(null, res);
  });
};

Shotgun.findByUsername = (username, result) => {
  sql.query("SELECT shotgun.cle, shotgun.id_user, shotgun.nom_shotgun, shotgun.date_shotgun, shotgun.nb_place, shotgun.photo_shotgun, shotgun.email, shotgun.age, shotgun.telephone, shotgun.genre, shotgun.custom, shotgun.custom_text, shotgun.username, shotgun.id_shotgun, shotgun.description FROM shotgun INNER JOIN event ON shotgun.cle = event.cle WHERE event.username = ? AND visible = 1 ORDER BY shotgun.date_shotgun", username.substring(1), (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found shotgun: ", res);
      result(null, res);
      return;
    }

    // not found Shotgun with the username
    result({ kind: "not_found" }, null);
  });
};

Shotgun.findByNext = (username, result) => {
  sql.query("SELECT shotgun.* FROM shotgun JOIN event ON shotgun.cle = event.cle WHERE event.username=? AND TIMEDIFF(shotgun.date_shotgun, NOW()) > 0 ORDER BY date_shotgun", username.substring(1), (err, res) => {
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

    // not found Shotgun with the username
    result({ kind: "not_found" }, null);
  });
};

Shotgun.findById = (id_shotgun, result) => {
  sql.query("SELECT * FROM shotgun WHERE id_shotgun=?", id_shotgun.substring(1), (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found shotgun: ", res);
      result(null, res);
      return;
    }

    // not found Shotgun with the username
    result({ kind: "not_found" }, null);
  });
};


module.exports = Shotgun;
