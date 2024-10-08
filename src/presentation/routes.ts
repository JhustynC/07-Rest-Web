import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/todos", TodoRoutes.routes);
    router.use("/api/v2/todos", TodoRoutes.routes);

    return router;
  }
}
