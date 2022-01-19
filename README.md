Running the server

Install MySQL and configure the database access in the file app/conf/db.conf.js

Run the script create_tables.sql to create the needed tables in MySQL database.
 
To start the backend server hosting the APIs, run:

npm install

npm start

api/swagger.yaml indlues API documentation

Using Postman to test these API :

POST api/shotgun => add new shotgun

GET api/shotgun/:id => get shotgun by id

PUT api/shotgun/:id update shotgun by id

DELETE api/shotgun/:id remove shotgun by id

GET api/shotgun?id=[123] find all shotgun whose id contains '123'
