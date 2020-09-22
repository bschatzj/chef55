const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// Import router files here
// const someRouter = require("./someRoute/some-router")
const usersRouter = require('./auth/user-router');

const server = express();


server.use(helmet());
let whitelist = ['http://localhost:8080','http://localhost:3000', 'https://secretrecipes.vercel.app/', 'https://tt720-secret-family-recipes.herokuapp.com/']

server.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    if (!origin) {
        return callback(null, true);
    }
    if (whitelist.indexOf(origin) === -1) {
      var message = 'The CORS policy for this origin doesn\'t allow access from the particular origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

server.use(express.json());
// Add your router file(s) here
// server.use("/someRoute", someRouter);
server.use(usersRouter);

// Message for "/" endpoint: Ex.: Dellrodar.herokuapp.com/
server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})

// 500 error message
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})


module.exports = server;