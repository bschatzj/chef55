const server = require("./server");

const env = process.env.NODE_ENV
const port = process.env.PORT || 8080;

server.listen(port, () => {
	console.log(`Running ${env} at http://localhost:${port}`);
});