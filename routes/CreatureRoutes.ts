import express from "express";
import Controller from "../controllers/CreatureController";

const router = express.Router();
const controller = new Controller();

router.get("/", controller.getCreatures);
router.get("/:id", controller.getCreature);
router.post("/", controller.addCreature);
router.put("/:id", controller.updateCreature);
router.delete("/:id", controller.deleteCreature);

export default router;