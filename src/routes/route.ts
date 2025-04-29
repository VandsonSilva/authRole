import UserController from "../controller/userController";
import { Router } from "express";
import {ensureAuth, ensureRole} from '../middlewares/auth.middleware'

const route = Router();

route.post('/auth/register', UserController.createUser)
route.post('/auth/login', UserController.login)
route.get('/auth/users', ensureAuth, ensureRole("ADMIN"), UserController.listUSers)


export default route