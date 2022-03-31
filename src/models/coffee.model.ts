import mongoose, {Schema, Document} from "mongoose";

const coffeeScema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    intensity: {
        type: Schema.Types.Number,
        required: true,
        min: 0,
        max: 10
    },
    origin: {
        type: Schema.Types.String,
    },
    price: {
        type: Schema.Types.Number,
        required: true
    }
}, {
    collection: "coffees",
    timestamps: true,
    versionKey: false
});

export interface CoffeeProps {
    name: string;
    intensity: number;
    origin?: string;
    price: number;
}

export type CoffeeDocument = CoffeeProps & Document;
export const CoffeeModel = mongoose.model("Coffee", coffeeScema);