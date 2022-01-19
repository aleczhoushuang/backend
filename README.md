Running the server

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
