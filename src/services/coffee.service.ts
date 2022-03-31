import {CoffeeDocument, CoffeeModel, CoffeeProps} from "../models";

export class CoffeeService {

    private static instance?: CoffeeService;

    public static getInstance() {
        if(CoffeeService.instance === undefined){
            CoffeeService.instance = new CoffeeService();
        }
        return CoffeeService.instance;
    }

    private constructor(){

    }

    public async createCoffee(props: CoffeeProps): Promise<CoffeeDocument>{
        const model = new CoffeeModel(props);
        return await model.save();
    }


}