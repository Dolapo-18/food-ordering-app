import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const {auth0Id} = req.body;
        const userExist = await User.findOne({auth0Id});

        if(userExist){
            // console.log("user already exists")
            return res.status(200).send({messge: "user already exists"})
        }

        const newUser = new User(req.body)
        await newUser.save();

        return res.status(201).json(newUser.toObject());
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error creating user "})
    }
}

export default {
    createCurrentUser 
}