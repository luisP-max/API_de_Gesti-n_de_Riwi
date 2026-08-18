import { Schema, model, Types } from "mongoose";

interface IRuta {
    nombre: string;
    tlId: Types.ObjectId; 
}


const rutaSchema = new Schema<IRuta>(
    {
        nombre: {
            type: String,
            required: true,
            unique: true, 
            trim: true    
        },

        tlId: {
            type: Schema.Types.ObjectId,
            ref: "TL",    
            required: true 
        }
    },
    {
        timestamps: true 
    }
);

export const Ruta = model<IRuta>("Ruta", rutaSchema);
