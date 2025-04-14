import express from "express";
import { globalErrorHandler } from "./lib/exceptions/global-error-handler";
import { CustomError } from "./lib/exceptions/CustomError";
import { userRoutes } from "./routes/user-route";
const app = express();

// Middleware to parse JSON bodies
// This is necessary for the server to understand JSON requests
app.use(express.json());

// // server health check
app.get("/", (req, res) => {
  res.json({ message: "Server is live..." });
});

app.use("/api/v1", userRoutes);

app.use(globalErrorHandler);

export { app };
