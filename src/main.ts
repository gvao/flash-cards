import { createServer } from "node:http";
import { app } from "./application/server";

const PORT = process.env.PORT || 3333;
const server = createServer(app);

server.listen(PORT, () =>
	console.log(`listening on: http://localhost:${PORT}`)
);

export { server, PORT };
