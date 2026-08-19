import express, { type Request, type Response } from 'express';
import { Types } from 'mongoose';
import { Ruta } from '../models/ruta.model.js';
import { TL } from '../models/tl.model.js';

const router = express.Router();

/**
 * @swagger
 * /api/rutas:
 *   post:
 *     summary: Crear una Ruta
 *     tags: [Rutas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - tlId
 *             properties:
 *               nombre:
 *                 type: string
 *               tlId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ruta creada con éxito
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, tlId } = req.body;
        if (!nombre || !tlId || typeof nombre !== 'string' || typeof tlId !== 'string') {
            return res.status(400).json({ message: 'Error: Campos requeridos incompletos.' });
        }
        if (!Types.ObjectId.isValid(tlId)) {
            return res.status(400).json({ message: 'Error: Formato de tlId inválido.' });
        }
        const tlExists = await TL.findById(tlId);
        if (!tlExists) {
            return res.status(400).json({ message: 'Error: El Team Leader referenciado no existe.' });
        }
        const nuevaRuta = await Ruta.create({ nombre, tlId });
        res.status(201).json({ message: 'Ruta creada con éxito', ruta: nuevaRuta });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear', error });
    }
});

/**
 * @swagger
 * /api/rutas:
 *   get:
 *     summary: Obtener todas las Rutas
 *     tags: [Rutas]
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const rutas = await Ruta.find().populate('tlId');
        res.json(rutas);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar', error });
    }
});

/**
 * @swagger
 * /api/rutas/{id}:
 *   put:
 *     summary: Actualizar una Ruta
 *     tags: [Rutas]
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
 *         description: Ruta actualizada
 */
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { nombre, tlId } = req.body;

        if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(tlId)) {
            return res.status(400).json({ message: 'Error: IDs con formato inválido.' });
        }
        const tlExists = await TL.findById(tlId);
        if (!tlExists) {
            return res.status(400).json({ message: 'Error: El Team Leader referenciado no existe.' });
        }

        const rutaActualizada = await Ruta.findByIdAndUpdate(id, { nombre, tlId }, { new: true });
        if (!rutaActualizada) return res.status(404).json({ message: 'Ruta no encontrada' });
        res.json({ message: 'Ruta actualizada con éxito', ruta: rutaActualizada });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar', error });
    }
});

/**
 * @swagger
 * /api/rutas/{id}:
 *   delete:
 *     summary: Eliminar una Ruta
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Eliminado
 */
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' });
        const rutaEliminada = await Ruta.findByIdAndDelete(id);
        if (!rutaEliminada) return res.status(404).json({ message: 'Ruta no encontrada' });
        res.json({ message: 'Ruta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error });
    }
});

export default router;
