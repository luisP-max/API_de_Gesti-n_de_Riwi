import { Schema, model, Types } from "mongoose";

interface IClan {
    nombre: string;
    rutaId: Types.ObjectId; 
}

const clanSchema = new Schema<IClan>(
    {
        nombre: {
            type: String,
            required: true,
            unique: true, 
            trim: true
        },

        rutaId: {
            type: Schema.Types.ObjectId,
            ref: "Ruta",   
            required: true 
        }
    },
    {
        timestamps: true 
    }
);

export const Clan = model<IClan>("Clan", clanSchema);