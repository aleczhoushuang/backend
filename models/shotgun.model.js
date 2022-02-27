const sql = require("./db.js");

// constructor
const Shotgun = function(shotgun) {
  this.id = shotgun.id;
  this.nom_shotgun= shotgun.nom_shotgun;
  this.date_shotgun = shotgun.date_shotgun;
  this.nb_place = shotgun.nb_place;
  this.photo_shotgun = shotgun.photo_shotgun;
  this.email = shotgun.email;
  this.age = shotgun.age;
  this.telephone = shotgun.telephone;
  this.genre = shotgun.genre;
  this.custom = shotgun.custom
};


function entierAleatoire(min, max)
  {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var liste = [0,1,2,6,8,7,3,5,9,4]
  //Utilisation
  //La variable contient un nombre aléatoire compris entre 1 et 10
  var entier = entierAleatoire(1, 10);
  for (let i = 0; i < liste.length; i++) {
    if (entier === liste[i]){
      entier = entierAleatoire(1, 10);
      i=0;
  }    
} 


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

Shotgun.findByNom = (nom_shotgun, result) => {
  sql.query("SELECT * FROM shotgun WHERE nom_shotgun = ?", nom_shotgun.substring(1), (err, res) => {
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

    // not found Shotgun with the nom
    result({ kind: "not_found" }, null);
  });
};


Shotgun.updateById = (id, shotgun, result) => {
  sql.query(
    "UPDATE shotgun SET nom_shotgun = ?, date_shotgun = ?, nb_place = ?, photo_shotgun = ?, email=?, age=?, telephone=?, genre=?, custom=? WHERE id = ?",
    [shotgun.nom_shotgun, shotgun.date_shotgun, shotgun.nb_place, shotgun.photo_shotgun, shotgun.email, shotgun.age, shotgun.telephone, shotgun.genre, shotgun.custom, id.substring(1) ],
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

Shotgun.getAll = (id, result) => {
  let query = "SELECT * FROM shotgun";

  if (id) {
    query += ` WHERE id LIKE '%${id}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("id: ", res);
    result(null, res);
  });
};

Shotgun.findByUsername = (username, result) => {
  sql.query("SELECT shotgun.id,shotgun.nom_shotgun,shotgun.date_shotgun,shotgun.nb_place,shotgun.photo_shotgun FROM shotgun INNER JOIN event ON shotgun.id = event.id WHERE username = ?", username.substring(1), (err, res) => {
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

    // not found Shotgun with the id
    result({ kind: "not_found" }, null);
  });
};


module.exports = Shotgun;
