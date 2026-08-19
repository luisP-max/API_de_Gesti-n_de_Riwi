import express, { type Request, type Response } from 'express';
import { Types } from 'mongoose';
import { Clan } from '../models/clan.model.js';
import { Ruta } from '../models/ruta.model.js';

const router = express.Router();

/**
 * @swagger
 * /api/clanes:
 *   post:
 *     summary: Crear un Clan
 *     tags: [Clanes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - rutaId
 *             properties:
 *               nombre:
 *                 type: string
 *               rutaId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Clan creado
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, rutaId } = req.body;
        if (!nombre || !rutaId || typeof nombre !== 'string' || typeof rutaId !== 'string') {
            return res.status(400).json({ message: 'Error: Campos requeridos incompletos.' });
        }
        if (!Types.ObjectId.isValid(rutaId)) {
            return res.status(400).json({ message: 'Error: Formato de rutaId inválido.' });
        }
        const rutaExists = await Ruta.findById(rutaId);
        if (!rutaExists) {
            return res.status(400).json({ message: 'Error: La Ruta referenciada no existe.' });
        }
        const nuevoClan = await Clan.create({ nombre, rutaId });
        res.status(201).json({ message: 'Clan creado con éxito', clan: nuevoClan });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear', error });
    }
});

/**
 * @swagger
 * /api/clanes:
 *   get:
 *     summary: Obtener todos los Clanes
 *     tags: [Clanes]
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const clanes = await Clan.find().populate('rutaId');
        res.json(clanes);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar', error });
    }
});

/**
 * @swagger
 * /api/clanes/{id}:
 *   put:
 *     summary: Actualizar un Clan
 *     tags: [Clanes]
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
 *         description: Actualizado
 */
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { nombre, rutaId } = req.body;

        if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(rutaId)) {
            return res.status(400).json({ message: 'Error: IDs no válidos.' });
        }
        const rutaExists = await Ruta.findById(rutaId);
        if (!rutaExists) {
            return res.status(400).json({ message: 'Error: La Ruta referenciada no existe.' });
        }

        const clanActualizado = await Clan.findByIdAndUpdate(id, { nombre, rutaId }, { new: true });
        if (!clanActualizado) return res.status(404).json({ message: 'Clan no encontrado' });
        res.json({ message: 'Clan actualizado con éxito', clan: clanActualizado });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar', error });
    }
});

/**
 * @swagger
 * /api/clanes/{id}:
 *   delete:
 *     summary: Eliminar un Clan
 *     tags: [Clanes]
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
        const clanEliminado = await Clan.findByIdAndDelete(id);
        if (!clanEliminado) return res.status(404).json({ message: 'Clan no encontrado' });
        res.json({ message: 'Clan eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error });
    }
});

export default router;
