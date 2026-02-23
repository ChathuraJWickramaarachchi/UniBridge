import express from 'express'; //import express
import mongoose from 'mongoose'; //import mongoose

//initializ the backend software to a variable
const app = express();

//mongodb connection setup 
mongoose.connect("mongodb+srv://admin:admin1234@cluster0.zzicnuz.mongodb.net/?appName=Cluster0").then(
    ()=>{
    console.log("Successfully connected with database");
    }
).catch(
    ()=>{
        console.log("Database connection failed");
    }
    
)

