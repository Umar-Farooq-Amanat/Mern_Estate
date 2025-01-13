import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

import userRouter from '../api/routes/user.routes.js';
import authRouter from '../api/routes/auth.route.js';

//UmarFarooq
//Umar@1034

//mern-real-estate
//umarfarooqbcs
//NfuWAmCvaBRNtDxH





mongoose.connect(process.env.MONGO).then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log(error)
})



const server = express();

server.use(express.json())
server.use('/api/user', userRouter);
server.use('/api/auth', authRouter);

server.use((err,req,res,next)=>{
const statuscode= err.statuscode || 500;
const message= err.message || 'internal server error';

return res.status(statuscode).json({
    success:false,
    statuscode,
    message
})
})


server.listen(3000, ()=>{
    console.log("server running");
})