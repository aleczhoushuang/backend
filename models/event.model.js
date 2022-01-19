const sql = require("./db.js");

// constructor
const Event = function(event) {
  this.id = event.id;
  this.username= event.username;
  this.admin = event.admin;
  this.info = event.info;
  this.temps_shot = event.temps_shot;
};

Event.create = (newEvent, result) => {
  sql.query("INSERT INTO event SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Event: ", { id: res.insertId, ...newEvent });
    result(null, { id: res.insertId, ...newEvent });
  });
};

Event.findById = (id, result) => {
    sql.query("SELECT * FROM event WHERE id = ?", id.substring(1), (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found event: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Event with the id
      result({ kind: "not_found" }, null);
    });
};


Event.updatebyId = (id, event, result) => {
  sql.query(
    "UPDATE event SET username = ?, admin = ?, info = ?, temps_shot = ? WHERE id = ?",
    [event.username, event.admin, event.info, event.temps_shot, id.substring(1) ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Event with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated event: ", { id: id, ...event });
      result(null, { id: id, ...event });
    }
  );
};

Event.remove = (id, result) => {
  sql.query("DELETE FROM event WHERE id = ?", id.substring(1), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Event with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted event with id: ", id.substring(1));
    result(null, res);
  });
};


module.exports = Event;
