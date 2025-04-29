import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";

const userServices = new userService();

class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {

        const { name, email, password, role } = req.body;
        const data = {
            name,
            email,
            password,
            role
        }

        await userServices.createUser(data)

    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const data = await userServices.login(email, password)
            res.json(data)
        } catch (err: any) {
            res.status(401).json({ error: err.message })
        }
    }

    async listUSers() {
        await userServices.listUSers()
    }

    async deleteUser(req: Request, res: Response) {
        const id = req.body

        await userServices.deleteUser(id)
    }
}

export default new UserController
