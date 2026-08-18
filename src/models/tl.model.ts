import { Schema, model } from "mongoose"

interface ITL {
    nombre: string;
    cargo: string;
}

const tlSchema = new Schema<ITL>(
    {
        nombre: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        cargo: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

export const TL = model<ITL>("TL", tlSchema);