import express from "express";
import Controller from "../controllers/AuthController";

const router = express.Router();
const controller = new Controller();

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;