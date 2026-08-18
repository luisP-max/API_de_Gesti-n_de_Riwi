import express from 'express';
import 'dotenv/config';
import { ConnectDB } from './config/db.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.listen(PORT, async () => {
    try {
        await ConnectDB();
        console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
        console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
    } catch (error) {
        console.error("Fallo crítico al iniciar el sistema:", error);
    }
});