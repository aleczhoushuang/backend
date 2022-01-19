const sql = require("./db.js");

// constructor
const User = function(user) {
  this.username = user.username;
  this.fullname= user.fullname;
  this.photo = user.photo;
  this.bio = user.bio;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created User: ", { username: res.insertUsername, ...newUser });
    result(null, { username: res.insertUsername, ...newUser });
  });
};

User.findByName = (username, result) => {
    sql.query("SELECT * FROM user WHERE username = ?", username.substring(1), (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the username
      result({ kind: "not_found" }, null);
    });
};


User.updateByName = (username, user, result) => {
  sql.query(
    "UPDATE user SET fullname = ?, photo = ?, bio = ? WHERE username = ?",
    [user.fullname, user.photo, user.bio, username.substring(1) ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the username
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { username: username, ...user });
      result(null, { username: username, ...user });
    }
  );
};

User.remove = (username, result) => {
  sql.query("DELETE FROM user WHERE username = ?", username.substring(1), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the username
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with username: ", username.substring(1));
    result(null, res);
  });
};


module.exports = User;
