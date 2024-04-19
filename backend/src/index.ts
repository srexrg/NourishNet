import dotenv from "dotenv";
import express from "express"
import connectDB from "./db/db";

dotenv.config()
const app=express()
const port = process.env.PORT || 5000;

connectDB()

app.get('/',(req,res)=>{
    res.send("Hello")
})


app.listen(port,()=>{
    console.log("Listening on",port)
})