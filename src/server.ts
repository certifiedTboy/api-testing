import http from "http";
import { app } from "./app";
const httpServer = http.createServer(app);
import { connectDb } from "./utils/db-config";

const startServer = async () => {
  await connectDb();
  httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

startServer();
