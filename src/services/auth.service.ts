import {UserDocument, UserModel, UserProps} from "../models";
import {SecurityUtils} from "../utils";

export class AuthService {

    private static instance?: AuthService;

    public static getInstance(): AuthService{
        if(AuthService.instance === undefined){
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    private constructor() {
    }

    public async subscribeUser(user: Partial<UserProps>): Promise<UserDocument>{
        if(!user.password){
            throw new Error("Missing password");
        }
        const model = new UserModel({
            login: user.login,
            password: SecurityUtils.sha512(user.password)
        })

        return model.save();
    }

}