import express from "express";
import Controller from "../controllers/CreatureController";
import { auth } from "../middleware/auth";

const router = express.Router();
const controller = new Controller();

router.get("/", controller.getCreatures);
router.get("/random", controller.getRandomCreature);
router.get("/:name", controller.getCreature);
router.post("/", auth, controller.addCreature);
router.put("/:id", auth, controller.updateCreature);
router.delete("/:id", auth, controller.deleteCreature);

export default router;
