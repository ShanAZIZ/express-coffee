import {SessionModel, UserDocument, UserModel, UserProps} from "../models";
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

    public async logIn(info: Pick<UserProps, 'login' | 'password'>, platform: string) {
        const user = await UserModel.findOne({
            login: info.login,
            password: SecurityUtils.sha512(info.password)
        }).exec();
        if(user === null){
            throw new Error('User not found');
        }
        const expirationDate = new Date(new Date().getTime() + 604_800_000);
        const session = await SessionModel.create({
            platform,
            expiration: expirationDate,
            user : user._id
        })
        user.session.push(session.id);
        await user.save();
        return session;
    }

}