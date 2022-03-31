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
        if (!coffeeBody.name || !coffeeBody.intensity || !coffeeBody.price) {
            res.status(400).end();
            return;
        }
        try {
            const coffee: CoffeeDocument = await CoffeeService.getInstance().createCoffee(
                {
                    name: coffeeBody.name,
                    intensity: coffeeBody.intensity,
                    origin: coffeeBody.origin,
                    price: coffeeBody.price
                });
            res.json(coffee);
        } catch {
            res.status(400).end();
            return;
        }

    }

    async getAllCoffees(req: Request, res: Response) {
        const coffees: CoffeeDocument[] = await CoffeeService.getInstance().getAll();
        res.json(coffees);
    }

    async getCoffee(req: Request, res: Response) {
        try {
            const coffee = await CoffeeService.getInstance().getById(req.params.coffeeId);
            if (coffee === null) {
                res.status(404).end();
                return;
            }
            res.json(coffee);
        } catch {
            res.status(400).end();
            return;
        }
    }

    async updateCoffee(req: Request, res: Response){
        try {
            const coffee = await CoffeeService.getInstance().updateById(req.params.coffeeId, req.body);
            if(!coffee){
                res.status(404).end();
                return;
            }
            res.json(coffee);
        }
        catch {
            res.status(400).end();
            return;
        }
    }


    async deleteCoffee(req: Request, res: Response){
        try {
            const success = await CoffeeService.getInstance().deleteById(req.params.coffeeId);
            if(success){
                res.status(204).end();
                return;
            } else {
                res.status(404).end();
                return;
            }
        }
        catch {
            res.status(400).end();
            return;
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.get('/', this.getAllCoffees.bind(this));
        router.get('/:coffeeId', this.getCoffee.bind(this));
        router.delete('/:coffeeId', this.deleteCoffee.bind(this));
        router.post('/', express.json(), this.createCoffee.bind(this)); // permet de forcer le this lors de l'appel de sayHello
        router.put('/:coffeeId', express.json(), this.updateCoffee.bind(this));
        return router;
    }

}