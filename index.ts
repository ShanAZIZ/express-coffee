import {config} from "dotenv";

config();
import express from "express";
import {CoffeeController} from "./src/controller";
import mongoose, {Mongoose} from "mongoose";

async function startServer(): Promise<void> {

    const db: Mongoose = await mongoose.connect(
        `${process.env.MONGO_URI}`,
        {
            auth: {
                username: process.env.MONGO_USER,
                password: process.env.MONGO_PWD
            }
        }
    );

    console.log("OK");

    const app = express();
    const coffeeController = new CoffeeController(db);
    app.use('/coffee', coffeeController.buildRoutes()); // enregistrement de la route
    app.listen(process.env.PORT, function () {
        console.log("Server listening on port ", process.env.PORT);
    })
}

startServer().catch(console.error);

