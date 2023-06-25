import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import CreatureRoutes from "./routes/CreatureRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";
import AuthService from "./services/AuthService";
import { auth } from "./middleware/auth";

dotenv.config();

const app: Express = express();
let port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // @ts-ignore
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token,"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
  return null;
});

const authService = new AuthService();

app.use(express.static("public"));
app.use("/api/v1/creatures", auth, CreatureRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", auth, UserRoutes);


const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

server.on("error", (err) => {
  if ((err as NodeJS.ErrnoException).code === "EADDRINUSE") {
    console.log(`Port ${port} is already in use, trying another port...`);
    port += 10;
    server.listen(port);
  } else {
    console.error(err);
  }
});