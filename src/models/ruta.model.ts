import { Schema, model, type Document, type Types } from 'mongoose';

export interface IRuta extends Document {
    nombre: string;
    tipo: 'basica' | 'avanzada';
    tlId: Types.ObjectId;
}

const RutaSchema = new Schema<IRuta>({
    nombre: { 
        type: String, 
        required: true, 
        unique: true 
    },
    tipo: { 
        type: String, 
        required: true, 
        enum: ['basica', 'avanzada'] 
    },
    tlId: { 
        type: Schema.Types.ObjectId, 
        ref: 'TL', 
        required: true 
    }
}, { timestamps: true });

export const Ruta = model<IRuta>('Ruta', RutaSchema);

//todo lo estoy haciendo manual en el mongoDB lo que son las rutas basicas e avanzadas