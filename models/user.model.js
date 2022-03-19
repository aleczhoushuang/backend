const sql = require("./db.js");

// constructor
const User = function(user) {
  this.id_user = user.id_user;
  this.username = user.username;
  this.password = user.password;
  this.fullname= user.fullname;
  this.photo = user.photo;
  this.bio = user.bio;
  this.age = user.age;
  this.telephone = user.telephone;
  this.genre = user.genre;
  this.lieu = user.lieu
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

User.login = (User, result) => {
  let username = User.username;
  let password = User.password;
  sql.query("SELECT * FROM user WHERE username=? AND password=?", [username, password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log("found account: ", res);
      result(null, res);
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
        console.log("found user: ", res);
        result(null, res);
        return;
      }
  
      // not found user with the username
      result({ kind: "not_found" }, null);
    });
};

User.getAll = (username, result) => {
  let query = "SELECT * FROM user";

  if (username) {
    query += ` WHERE username LIKE '%${username}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("username: ", res);
    result(null, res);
  });
};


User.updateByName = (username, user, result) => {
  sql.query(
    "UPDATE user SET username = ?, password = ?, fullname = ?, photo = ?, bio = ?, age=?, telephone=?, genre=?, lieu=? WHERE username = ?",
    [user.username, user.password, user.fullname, user.photo, user.bio, user.age, user.telephone, user.genre, user.lieu, username.substring(1) ],
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
  sql.query(
    "DELETE FROM user WHERE username=?", username.substring(1), (err, res) => {
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
