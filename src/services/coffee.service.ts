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

    public async getAll(): Promise<CoffeeDocument[]> {
        return CoffeeModel.find().exec();
    }


    async getById(id: string): Promise<CoffeeDocument | null> {
        return CoffeeModel.findById(id).exec();
    }

    async deleteById(coffeeId: string): Promise<boolean> {
        const res = await CoffeeModel.deleteOne({_id: coffeeId}).exec();
        return res.deletedCount === 1;
    }
}