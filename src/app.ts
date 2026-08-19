// importacion de dependencias
import express from 'express';
import 'dotenv/config';
import * as swaggerUi from 'swagger-ui-express'; 
// conecciones del database
import { swaggerSpec } from './config/swagger.js'; 
import { ConnectDB } from './config/db.js';       

//importacion de las rutas de router
import routerAuth from './routes/auth.router.js';
import routerTL from './routes/tl.router.js';
import routerRuta from './routes/ruta.router.js';
import routerClan from './routes/clan.router.js';
import routerCoder from './routes/coder.router.js';

const PORT: number | string = process.env.PORT || 3000;
const app = express();

app.use(express.json());

//apis
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use('/api/auth', routerAuth);
app.use('/api/tls', routerTL);     
app.use('/api/rutas', routerRuta);  
app.use('/api/clanes', routerClan);  
app.use('/api/coders', routerCoder); 

//puertos
app.listen(PORT, async () => {
    try {
        await ConnectDB();
        console.log(` Servidor corriendo en http://localhost:${PORT}`);
        console.log(` Swagger UI disponible en http://localhost:${PORT}/api-docs`);
    } catch (error) {
        console.error(" Fallo crítico al iniciar el sistema:", error);
    }
});
