// require('dotenv').config({path: './env'})   
//  --- breaks the consistency of the code, similar versions are available to import dotenv

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path: './.env'
})


// Database connections:
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})














/*

                        Database Connectivity!
    Better Methods to connect DataBase through DB files

import express from "express"
const app = express()

// function connectDB(){}

// connectDB()


//              Assignment: 1(listen event for error in app )
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/
        ${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port${process.env.PORT} `);
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()


*/