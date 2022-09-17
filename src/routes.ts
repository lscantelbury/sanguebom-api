import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { PostController } from "./controllers/PostController";

const routes = Router();

const userController = new UserController();
const postController = new PostController();

routes.get("/users", userController.index);
routes.post("/create-user", userController.create);
routes.put("/update-user/:user_id_pk", userController.update);

routes.post("/create-post", postController.create);
routes.get("/posts/:post_owner_id", postController.show);
routes.get("/posts", postController.index);

export { routes };