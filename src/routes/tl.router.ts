import express, { type Request, type Response } from 'express';
import { Types } from 'mongoose';
import { TL } from '../models/tl.model.js';

const router = express.Router();

/**
 * @swagger
 * /api/tls:
 *   post:
 *     summary: Crear un Team Leader
 *     tags: [Team Leaders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - cargo
 *             properties:
 *               nombre:
 *                 type: string
 *               cargo:
 *                 type: string
 *     responses:
 *       201:
 *         description: TL creado con éxito
 *       400:
 *         description: Datos incompletos o inválidos
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, cargo } = req.body;
        if (!nombre || !cargo || typeof nombre !== 'string' || typeof cargo !== 'string') {
            return res.status(400).json({ message: 'Error: Los campos nombre y cargo son obligatorios y deben ser texto.' });
        }
        const nuevoTL = await TL.create({ nombre, cargo });
        res.status(201).json({ message: 'Team Leader creado con éxito', tl: nuevoTL });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el TL', error });
    }
});

/**
 * @swagger
 * /api/tls:
 *   get:
 *     summary: Obtener todos los Team Leaders
 *     tags: [Team Leaders]
 *     responses:
 *       200:
 *         description: Lista de TLs obtenida con éxito
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const tls = await TL.find();
        res.json(tls);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar los TLs', error });
    }
});

/**
 * @swagger
 * /api/tls/{id}:
 *   put:
 *     summary: Actualizar un Team Leader
 *     tags: [Team Leaders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: TL actualizado con éxito
 *       400:
 *         description: ID o datos inválidos
 *       404:
 *         description: TL no encontrado
 */
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { nombre, cargo } = req.body;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Error: El ID proporcionado no es válido.' });
        }
        if (!nombre || !cargo || typeof nombre !== 'string' || typeof cargo !== 'string') {
            return res.status(400).json({ message: 'Error: Campos inválidos o incompletos.' });
        }

        const tlActualizado = await TL.findByIdAndUpdate(id, { nombre, cargo }, { new: true });
        if (!tlActualizado) return res.status(404).json({ message: 'Team Leader no encontrado' });
        
        res.json({ message: 'TL actualizado con éxito', tl: tlActualizado });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar', error });
    }
});

/**
 * @swagger
 * /api/tls/{id}:
 *   delete:
 *     summary: Eliminar un Team Leader
 *     tags: [Team Leaders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TL eliminado con éxito
 */
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Error: ID no válido.' });
        }
        const tlEliminado = await TL.findByIdAndDelete(id);
        if (!tlEliminado) return res.status(404).json({ message: 'Team Leader no encontrado' });
        res.json({ message: 'Team Leader eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error });
    }
});

export default router;
