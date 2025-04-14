import http from "http";
import { app } from "./app";
const httpServer = http.createServer(app);
import { connectDb } from "./utils/db-config";
import { PORT } from "./lib/constants/index";

const startServer = async () => {
  await connectDb();
  httpServer.listen(PORT, () => {
    console.log("Server is running on port 3000");
  });
};

startServer();
