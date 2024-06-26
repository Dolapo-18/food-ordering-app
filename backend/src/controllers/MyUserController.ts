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

const updateCurrentUser = async(req: Request, res: Response) => {
    try {
        const {name, addressLine1, country, city} = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: "User not found!"})
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city

        await user.save();
        return res.status(201).json(user.toObject());


    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Cannot update user profile"})
    }
}


const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findOne({ _id: req.userId });

        if (!currentUser) {
            return res.status(404).json({message: "User not found!"})
        }

        return res.status(200).json(currentUser);


    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Cannot get user profile"})
    }
}




export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser
}