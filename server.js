const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// Import router files here
// const someRouter = require("./someRoute/some-router")

const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());
// Add your router file(s) here
// server.use("/someRoute", someRouter);

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