import {config} from "dotenv";
import express from "express";
import {CoffeeController} from "./src/controller";
config();

const app = express();


const coffeeController = new CoffeeController();

app.use('/coffee', coffeeController.buildRoutes()); // enregistrement de la route

app.listen(process.env.PORT, function (){
    console.log("Server listening on port ", process.env.PORT);
})