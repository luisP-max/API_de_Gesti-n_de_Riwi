import express, { type Request, type Response } from 'express';
import { TL } from '../models/tl.model.js';
import { Types } from 'mongoose'; 
const router = express.Router();

/**
 * @swagger
 * /api/tls:
 *   get:
 *     summary: Obtener todos los Team Leaders
 *     description: Retorna la lista de todos los TLs registrados en el sistema (Criterio 1).
 *     tags:
 *       - Team Leaders (TL)
 *     responses:
 *       200:
 *         description: Lista de TLs obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   cargo:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const tls = await TL.find();
        
        res.json(tls);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al consultar los Team Leaders', 
            error 
        });
    }
});

export default router;
