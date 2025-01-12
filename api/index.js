import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

//UmarFarooq
//Umar@1034
//umarfarooqbcs
//NfuWAmCvaBRNtDxH


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log(error)
})


const app = express();




app.listen(3000, ()=>{
    console.log("server running");
})