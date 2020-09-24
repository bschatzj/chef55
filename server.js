const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Import router files here
// const someRouter = require("./someRoute/some-router")
const usersRouter = require('./auth/user-router');
const recipesRouter = require('./recipes/recipes-router');
const measurementsRouter = require('./measurements/measurements-router');

const server = express();


server.use(helmet());

server.use(cors({
  origin: ['http://localhost:8080','http://localhost:3000', 'https://secretrecipes.vercel.app'],
  credentials: true
}));

server.use(express.json());
server.use(cookieParser());
// Add your router file(s) here
// server.use("/someRoute", someRouter);
server.use(usersRouter);
server.use('/recipes', recipesRouter);
server.use(measurementsRouter);

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