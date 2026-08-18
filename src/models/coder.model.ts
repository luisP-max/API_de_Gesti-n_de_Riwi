import { Schema, model, Types } from "mongoose";

interface ICoder {
    nombre: string;
    email: string;
    estado: 'activo' | 'inactivo' | 'graduado'; 
    clanId: Types.ObjectId;
}

const coderSchema = new Schema<ICoder>(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true, 
            trim: true,
            lowercase: true 
        },

        estado: {
            type: String,
            required: true,
            enum: ['activo', 'inactivo', 'graduado'], 
            default: 'activo'
        },

        clanId: {
            type: Schema.Types.ObjectId,
            ref: "Clan",   
            required: true  
        }
    },
    {
        timestamps: true 
    }
);

export const Coder = model<ICoder>("Coder", coderSchema);
