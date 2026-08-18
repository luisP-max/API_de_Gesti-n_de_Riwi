import express, { type Request, type Response } from 'express';
import { Ruta } from '../models/ruta.model.js';
import { Types } from 'mongoose'; 
const router = express.Router();

/**
 * @swagger
 * /api/rutas:
 *   get:
 *     summary: Obtener todas las rutas con su TL
 *     description: Retorna la lista de rutas incluyendo los datos del Team Leader asociado (Criterio 2).
 *     tags:
 *       - Rutas
 *     responses:
 *       200:
 *         description: Lista de rutas obtenida con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        // .populate('tlId') reemplaza el ID del TL con todo el objeto del Team Leader
        const rutas = await Ruta.find().populate('tlId');
        res.json(rutas);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar las rutas', error });
    }
});

export default router;
