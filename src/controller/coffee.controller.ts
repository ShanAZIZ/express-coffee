import express, {Router, Request, Response} from "express";
import {Mongoose} from "mongoose";
import {CoffeeDocument} from "../models";
import {CoffeeService} from "../services";

export class CoffeeController {

    private mongoose: Mongoose;

    constructor(mongoose: Mongoose) {
        this.mongoose = mongoose;
    }

    async createCoffee(req: Request, res: Response) {
        const coffeeBody = req.body;
        if(!coffeeBody.name || !coffeeBody.intensity || !coffeeBody.price) {
            res.status(400).end();
            return;
        }
        const coffee: CoffeeDocument = await CoffeeService.getInstance().createCoffee(
            {
                name: coffeeBody.name,
                intensity: coffeeBody.intensity,
                origin: coffeeBody.origin,
                price: coffeeBody.price
            });
        res.json(coffee);
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.post('/', express.json(), this.createCoffee.bind(this)); // permet de forcer le this lors de l'appel de sayHello
        return router;
    }

}