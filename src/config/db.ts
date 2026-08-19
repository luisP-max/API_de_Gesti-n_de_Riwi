import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

export const ConnectDB = async () => {
    try {
        if (!MONGODB_URI) {
            console.error(" ERROR CRÍTICO: La variable MONGODB_URI está vacía o es undefined en el archivo .env");
            process.exit(1);
        }

        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Conectado exitosamente');
    } catch (err) {
        console.error(" ERROR AL CONECTAR A MONGO:", err);
        process.exit(1);
    }
}
