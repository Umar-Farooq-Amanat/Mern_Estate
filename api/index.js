import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

import userRouter from '../api/routes/user.routes.js'

//UmarFarooq
//Umar@1034
//umarfarooqbcs
//NfuWAmCvaBRNtDxH


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log(error)
})


const server = express();

server.use('/api/user', userRouter);


server.listen(3000, ()=>{
    console.log("server running");
})