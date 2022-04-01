import {config} from "dotenv";

config();
import express from "express";
import {CoffeeController} from "./src/controller";
import mongoose from "mongoose";
import {AuthController} from "./src/controller/auth.controller";

async function startServer(): Promise<void> {

    await mongoose.connect(
        `${process.env.MONGO_URI}`,
        {
            auth: {
                username: process.env.MONGO_USER,
                password: process.env.MONGO_PWD
            }
        }
    );

    const app = express();
    const coffeeController = new CoffeeController();
    const authController = new AuthController();

    app.use('/coffee', coffeeController.buildRoutes()); // enregistrement de la route
    app.use('/auth', authController.buildRoutes());

    app.listen(process.env.PORT, function () {
        console.log("Server listening on port ", process.env.PORT);
    })
}

startServer().catch(console.error);

