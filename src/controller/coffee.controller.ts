import express, {Router, Request, Response} from "express";

export class CoffeeController {

    sayHello(req: Request, res: Response){
        res.send("Hello");
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.get('/', this.sayHello.bind(this)); // permet de forcer le this lors de l'appel de sayHello
        return router;
    }

}