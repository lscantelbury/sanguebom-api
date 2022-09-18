import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { PostController } from "./controllers/PostController";
import { HospitalController } from "./controllers/HospitalController";
import { LikeController } from "./controllers/LikeController";
import { CommentController } from "./controllers/CommentController";
import { CertificationController } from "./controllers/CertificationController";

const routes = Router();

const userController = new UserController();
const postController = new PostController();
const hospitalController = new HospitalController();
const likeController = new LikeController();
const commentController = new CommentController();
const certificationController = new CertificationController();

routes.get("/users", userController.index);
routes.post("/create-user", userController.create);
routes.put("/update-user/:user_id_pk", userController.update);
routes.post("/login", userController.login);
routes.put("/add-points/:user_id_pk", userController.addPoints);
routes.put("/reset-password/:user_id_pk", userController.resetPassword);

routes.post("/create-post", postController.create);
routes.get("/posts", postController.index);
routes.get("/posts/hospital/:hosp_id_pk", postController.postsByHospital);
routes.get("/posts/user/:user_id_pk", postController.postsByUser);

routes.post("/create-hospital", hospitalController.create);
routes.get("/hospitals", hospitalController.index);
routes.get("/hospitals/:hosp_id_pk", hospitalController.show);
routes.put("/reset-hospital-password/:hosp_id_pk", hospitalController.resetPassword);

routes.delete("/delete-like/:id_like_pk", likeController.delete);
routes.post("/create-like", likeController.create);
routes.get("/likes/post/:post_id_fk", likeController.likesByPost);

routes.post("/create-comment", commentController.create);
routes.get("/comments", commentController.index);
routes.get("/comments/post/:post_id_fk", commentController.commentByPost);
routes.delete("/delete-comment/:com_id_pk", commentController.delete);

routes.get("/certifications", certificationController.index);
routes.post("/create-certification", certificationController.create);
routes.get("/certifications/user/:user_id_fk", certificationController.certificationsByUser);

export { routes };