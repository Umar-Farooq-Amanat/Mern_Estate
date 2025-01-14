import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import errorHandler from "../utils/error.js";
import jwt from 'jsonwebtoken'


const signup = async(req,res,next)=>{

    const {username, email, password} = req.body;

    const hashPassword = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password: hashPassword});

    try{
        await newUser.save();
        res.status(201).json("user created successfully");
    }catch(error)
    {
        next(error);
    }



}

const signin = async (req,res,next)=>{
    try {
        const {email, password} = req.body;
        const validUser = await User.findOne({email});
        if(!validUser)
        {
            return next(errorHandler(404, "user not found"))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword)
        {
            return next(errorHandler(401, "wrong credentials"))
        }

        const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET);

        const {password: pass, ...rest} = validUser._doc;
        res
        .cookie('access_token', token, {httpOnly:true})
        .status(200)
        .json(rest);


    } catch (error) {
        next(error)
    }
}

export {signup,signin}


