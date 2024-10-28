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

    // Route with potential lack of error handling, CodeQL might flag this
    this.app.get("/error-prone", (req: Request, res: Response) => {
      // Potentially error-prone code without proper try-catch handling
      const riskyData = JSON.parse(req.query.data as string); // Assume data is not validated
      return res.send(riskyData);
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
