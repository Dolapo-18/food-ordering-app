import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

const app = express()

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(() => { console.log("Connected to DB")})

app.use(express.json())
app.use(cors())

//health Check
app.get('/health', (req: Request, res: Response) => {
    res.send({message: "Health Ok!"})
})

app.use('/api/my/user', myUserRoute);

app.listen(7001, () => {
    console.log(`Server running on port 7001`)
})
