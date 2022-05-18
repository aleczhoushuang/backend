const sql = require("./db.js");

// constructor
const User = function(user) {
    this.photo = user.photo;
  };

User.updatePhotoUser = (username, user, result) => {
    sql.query(
      "UPDATE user SET photo = ? WHERE username = ?",
      [user.photo, username.substring(1) ],
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