import express, { type Request, type Response } from 'express';
import { Clan } from '../models/clan.model.js';
import { Types } from 'mongoose'; 
const router = express.Router();

/**
 * @swagger
 * /api/clanes:
 *   get:
 *     summary: Obtener todos los clanes con su Ruta
 *     description: Retorna la lista de clanes incluyendo los datos de la ruta asociada (Criterio 3).
 *     tags:
 *       - Clanes
 *     responses:
 *       200:
 *         description: Lista de clanes obtenida con éxito.
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const clanes = await Clan.find().populate('rutaId');
        res.json(clanes);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar los clanes', error });
    }
});

export default router;
