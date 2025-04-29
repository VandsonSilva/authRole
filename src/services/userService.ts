import { prisma } from '../lib/prisma';
import {Role} from '@prisma/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {

    async createUser(data: { name: string; email: string; password: string; role: Role }) {
        const verify = await prisma.user.findUnique({
            where: { email: data.email }
        })

        if (verify) throw new Error('Usuário já cadastrado')

        if (!Object.values(Role).includes(data.role)) {
            throw new Error('Role inválido')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role
            }
        })

        return user
    }


    async getUSerByID(id: number) {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) throw new Error('Usúario não encontrado')

        return user
    }

    async listUSers() {
        return await prisma.user.findMany()
    }

    async deleteUser(id: number) {
        await this.getUSerByID(id)
        await prisma.user.delete({
            where: { id }
        })

        return { message: 'Usuario deletado com sucesso' }
    }

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user) {
            throw new Error('Usúario não encontrado')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            throw new Error('Usúairo ou senha inváldio')
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET!,
            {expiresIn: '1h'}
        )

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        }


    }

}

export default UserService