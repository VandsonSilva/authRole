import express from 'express';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import route from './routes/route';

const app = express();

app.use(express.json());
app.use(route)

dotenv.config();

const PORT = process.env.PORT || 3333

try{

    app.listen(PORT, () => {
        console.log("Server ON no console")
    })

    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({
            message: 'Online'
        })
    })

} catch(error) {
    console.log(error)
}