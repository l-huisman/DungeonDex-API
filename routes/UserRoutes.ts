import express from 'express';
import Controller from '../controllers/UserController';

const router = express.Router();
const controller = new Controller();

router.get('/', controller.getUsers);

export default router;
