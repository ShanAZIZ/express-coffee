import express, {Router, Request, Response} from "express";
import {UserDocument} from "../models";
import {AuthService} from "../services/auth.service";

export class AuthController {

    async createUser(req: Request, res: Response){
        const userBody = req.body;
        if (!userBody.login || !userBody.password ) {
            res.status(400).end();
            return;
        }
        try {
            const user: UserDocument = await AuthService.getInstance().subscribeUser(
                {
                    login: userBody.login,
                    password: userBody.password
                });
            res.json(user);
        } catch {
            res.status(400).end();
            return;
        }
    }


    buildRoutes(): Router {
        const router = express.Router();
        router.post('/subscribe', express.json(), this.createUser.bind(this));
        return router;
    }
}