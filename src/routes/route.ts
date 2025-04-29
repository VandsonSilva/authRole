import UserController from "../controller/userController";
import { Router } from "express";

const route = Router();

route.post('/auth/register', UserController.createUser)
route.post('/auth/login', UserController.login)


export default route