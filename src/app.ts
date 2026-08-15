import express from 'express';
import 'dotenv/config';
import { ConnectDB } from './config/db.js'

const {PORT} = process.env;

const app = express();
app.use(express.json());

app.listen(PORT, async() =>{
    
    await ConnectDB();

    console.log("Servidor corriendo en el puerto", PORT);
});