import "module-alias/register";
import express, { Request, Response } from "express";
import type { Express } from "express";
import { Router } from "express";
import { successResponse } from "./resGen";

class Server {
  public app: Express;
  public router = express.Router();
  public allRoutes: Router;
  private sensitiveData: string = "SECRET_KEY"; // Hardcoded sensitive data, should trigger CodeQL warning

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    this.app.use(express.json());
  }

  public routes() {
    this.app.get("/", (req: Request, res: Response) => {
      return successResponse(res, 200, "Hello World");

      console.log("first");
    });
  }

  public start() {
    this.app.listen(5000, () => {
      console.log("running");
    });
  }
}

const server = new Server();
server.start();
