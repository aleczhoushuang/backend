const sql = require("./db.js");

// constructor
const Event = function(event) {
  this.id_event = event.id_event;
  this.id_user = event.id_user;
  this.cle = event.cle;
  this.username= event.username;
  this.admin = event.admin;
  this.age = event.age;
  this.telephone = event.telephone;
  this.genre = event.genre;
  this.custom = event.custom;
  this.temps_shot = event.temps_shot;
  this.visible = event.visible
};

Event.create = (newEvent, result) => {
  sql.query("INSERT INTO event SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Event: ", { cle: res.insertCle, ...newEvent });
    result(null, { cle: res.insertCle, ...newEvent });
  });
};

Event.findByCle = (cle, result) => {
    sql.query("SELECT * FROM event WHERE cle = ? ORDER BY event.temps_shot", cle.substring(1), (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found event: ", res);
        result(null, res);
        return;
      }
  
      // not found Event with the cle
      result({ kind: "not_found" }, null);
    });
};

Event.findByCleInscrit = (cle, result) => {
  sql.query("SELECT * FROM event WHERE cle = ? AND length(temps_shot) > 0 ORDER BY event.temps_shot", cle.substring(1), (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found event: ", res);
      result(null, res);
      return;
    }

    // not found Event with the cle
    result({ kind: "not_found" }, null);
  });
};

Event.findByUsername = (username, result) => {
  sql.query("SELECT * FROM event WHERE username = ?", username.substring(1), (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found event: ", res);
      result(null, res);
      return;
    }

    // not found Event with the username
    result({ kind: "not_found" }, null);
  });
};

Event.findByUsername_cle = (username, cle, result) => {
  let username1 = username.substring(1);
  let cle1 = cle.substring(1);
  console.log("username="+username1+",cle="+cle1);
  sql.query("SELECT * FROM event WHERE username = ? AND cle = ?", [username1, cle1],(err, res) => {
      if (err) {
      console.log("fonction findusername_cle3: ", err);
      result(err, null);
      return;
    }

    console.log("continue findbyusername_cle")


    if (res.length) {
      console.log("fonction found event: ", res);
      result(null, res);
      return;
    }

    
    // not found Event with the username
    result({ kind: "not_found" }, null);
  });
};

Event.getAll = (cle, result) => {
  let query = "SELECT * FROM event";

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

Event.updateByCle = (cle, event, result) => {
  sql.query(
    "UPDATE event SET username = ?, admin = ?, age=?, telephone=?, genre=?, custom=?, temps_shot = ?, visible = ? WHERE cle = ?",
    [event.username, event.admin, event.age,  event.telephone, event.genre, event.custom, event.temps_shot, event.visible, cle.substring(1) ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Event with the cle
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated event: ", { cle: cle, ...event });
      result(null, { cle: cle, ...event });
    }
  );
};

Event.updateByUsername_cle = (username, cle, event, result) => {
  let username1 = username.substring(1);
  console.log("username="+username1);
  sql.query(
    "UPDATE event SET username = ?, admin = ?, age=?, telephone=?, genre=?, custom=?, temps_shot = ?, visible = ? WHERE username = ? AND cle=?",
    [event.username, event.admin, event.age,  event.telephone, event.genre, event.custom, event.temps_shot, event.visible, username.substring(1), cle.substring(1) ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Event with the cle
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated event: ", { cle: cle, ...event });
      result(null, { cle: cle, ...event });
    }
  );
};


Event.remove = (cle, result) => {
  sql.query("DELETE FROM event WHERE cle = ?", cle.substring(1), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Event with the cle
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted event with cle: ", cle.substring(1));
    result(null, res);
  });
};

Event.removeunique = (username, cle, result) => {
  let username1 = username.substring(1);
  let cle1 = cle.substring(1);
  console.log("username="+username1+",cle="+cle1);
  sql.query("DELETE FROM event WHERE username = ? AND cle=?", [username1, cle1], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Event with the cle
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted event with cle: ", cle.substring(1), "and username: ", username.substring(1));
    result(null, res);
  });
};


module.exports = Event;
