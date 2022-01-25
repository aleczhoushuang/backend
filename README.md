# Start backend of the shotgun application
The backend is built with Node.js, Framework Express, MySQL database and REST API.
Follow the steps below to deploy the backend server:
- install MySQL or use your existing mysql server instance
- configure the database access in the file app/conf/db.conf.js
- run the script create_tables.sql in MySQL to create the needed tables.
- start the backend server hosting the APIs:
  - npm install
  - npm start

# API 
- api/swagger.yaml indlues API documentation. The following APIs are developed (can be tested with Postman):
- add new shotgun
  - POST api/shotgun
- get shotgun by id  
  - GET api/shotgun/:id
- update shotgun by id  
  - PUT api/shotgun/:id 
- remove shotgun by id
  - DELETE api/shotgun/:id
- find all shotgun whose id contains '123'
  - GET api/shotgun?id=[123] 
  
