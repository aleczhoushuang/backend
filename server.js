const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to shotgun application ! " });
});

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

require("./routes/event.route.js")(app);
require("./routes/game.route.js")(app);
require("./routes/shotgun.route.js")(app);
require("./routes/user.route.js")(app);
require("./routes/index.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`shotgun server is running on port ${PORT}.`);
});