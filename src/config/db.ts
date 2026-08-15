import mongoose from 'mongoose'

const {MONGODB_URI} = process.env;

export const ConnectDB = async () => {
    try{
        await mongoose.connect(MONGODB_URI || '');
        console.log('MongoDB Conectado');
    }catch(err){
        console.log(err);
    }
}