const sql = require("./db.js");

// constructor
const Event = function(event) {
  this.id = event.id;
  this.username= event.username;
  this.admin = event.admin;
  this.email = event.email;
  this.age = event.age;
  this.telephone = event.telephone;
  this.genre = event.genre;
  this.custom = event.custom;
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
        console.log("found event: ", res);
        result(null, res);
        return;
      }
  
      // not found Event with the id
      result({ kind: "not_found" }, null);
    });
};

Event.getAll = (id, result) => {
  let query = "SELECT * FROM event";

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


Event.updateById = (id, event, result) => {
  sql.query(
    "UPDATE event SET username = ?, admin = ?, email=?, age=?, telephone=?, genre=?, custom=?, temps_shot = ? WHERE id = ?",
    [event.username, event.admin, event.temps_shot, event.email, event.age, event.telephone, event.genre, event.custom, id.substring(1) ],
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
