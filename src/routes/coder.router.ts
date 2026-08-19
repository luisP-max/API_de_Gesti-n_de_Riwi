import express, { type Request, type Response } from 'express';
import { Types } from 'mongoose';
import { Coder } from '../models/coder.model.js';
import { Clan } from '../models/clan.model.js';

const router = express.Router();

/**
 * @swagger
 * /api/coders:
 *   post:
 *     summary: Crear un Coder
 *     tags: [Coders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - estado
 *               - clanId
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [activo, inactivo, graduado]
 *               clanId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Coder creado con éxito
 *       400:
 *         description: Datos inválidos o faltantes
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, email, estado, clanId } = req.body;

        if (!nombre || !email || !estado || !clanId) {
            return res.status(400).json({ 
                message: 'Error: Faltan campos requeridos (nombre, email, estado, clanId).' 
            });
        }

        if (typeof nombre !== 'string' || typeof email !== 'string' || typeof estado !== 'string' || typeof clanId !== 'string') {
            return res.status(400).json({ 
                message: 'Error: Los tipos de datos deben ser cadenas de texto (string).' 
            });
        }

        if (!Types.ObjectId.isValid(clanId)) {
            return res.status(400).json({ 
                message: 'Error: El campo clanId no tiene un formato válido de base de datos.' 
            });
        }

        const clanExists = await Clan.findById(clanId);
        if (!clanExists) {
            return res.status(400).json({ 
                message: 'Error: El Clan referenciado no existe en la base de datos.' 
            });
        }

        const nuevoCoder = await Coder.create({ 
            nombre, 
            email, 
            estado: estado as 'activo' | 'inactivo' | 'graduado', 
            clanId 
        });

        res.status(201).json({ message: 'Coder creado con éxito', coder: nuevoCoder });

    } catch (error) {
        res.status(400).json({ message: 'Error al procesar la petición', error });

    }
});

/**
 * @swagger
 * /api/coders:
 *   get:
 *     summary: Obtener todos los Coders
 *     tags: [Coders]
 *     responses:
 *       200:
 *         description: Lista de coders con su clan asociado
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const coders = await Coder.find().populate('clanId');
        res.json(coders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los coders', error });
    }
});

/**
 * @swagger
 * /api/coders/{id}:
 *   put:
 *     summary: Actualizar un Coder
 *     tags: [Coders]
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
 *         description: Coder actualizado con éxito
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Coder no encontrado
 */
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const { nombre, email, estado, clanId } = req.body;

        
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Error: El ID del coder proporcionado en la URL no es válido.' });
        }

        if (!nombre || !email || !estado || !clanId) {
            return res.status(400).json({ 
                message: 'Error: Faltan campos requeridos para actualizar (nombre, email, estado, clanId).' 
            });
        }

        if (typeof nombre !== 'string' || typeof email !== 'string' || typeof estado !== 'string' || typeof clanId !== 'string') {
            return res.status(400).json({ 
                message: 'Error: Todos los campos enviados deben ser cadenas de texto (string).' 
            });
        }

        if (!Types.ObjectId.isValid(clanId)) {
            return res.status(400).json({ 
                message: 'Error: El campo clanId no tiene un formato válido de base de datos.' 
            });
        }

        const clanExists = await Clan.findById(clanId);
        if (!clanExists) {
            return res.status(400).json({ 
                message: 'Error: El Clan referenciado no existe en la base de datos.' 
            });
        }

        const coder = await Coder.findByIdAndUpdate(
            id,
            { nombre, email, estado, clanId },
            { new: true, runValidators: true }
        );

        if (!coder) return res.status(404).json({ message: 'Coder no encontrado' });
        res.json({ message: 'Coder actualizado con éxito', coder });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el coder', error });
    }
});

/**
 * @swagger
 * /api/coders/{id}:
 *   delete:
 *     summary: Eliminar un Coder
 *     tags: [Coders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coder eliminado con éxito
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Coder no encontrado
 */
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Error: El ID del coder proporcionado no es válido.' });
        }

        const coder = await Coder.findByIdAndDelete(id);
        if (!coder) return res.status(404).json({ message: 'Coder no encontrado' });
        res.json({ message: 'Coder eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el coder', error });
    }
});

/**
 * @swagger
 * /api/coders/clan/{clanId}:
 *   get:
 *     summary: Consultar coders por clan específico
 *     tags: [Coders]
 *     parameters:
 *       - in: path
 *         name: clanId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de coders pertenecientes al clan
 *       400:
 *         description: ID de clan inválido
 */
router.get('/clan/:clanId', async (req: Request, res: Response) => {
    try {
        const clanId = req.params.clanId as string;

        if (!Types.ObjectId.isValid(clanId)) {
            return res.status(400).json({ message: 'El ID del clan no es válido' });
        }

        const coders = await Coder.find({ clanId: new Types.ObjectId(clanId) });
        res.json(coders);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar coders por clan', error });
    }
});

/**
 * @swagger
 * /api/coders/ruta/{rutaId}:
 *   get:
 *     summary: Consultar coders por ruta específica
 *     tags: [Coders]
 *     parameters:
 *       - in: path
 *         name: rutaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de coders pertenecientes a la ruta
 *       400:
 *         description: ID de ruta inválido
 */
router.get('/ruta/:rutaId', async (req: Request, res: Response) => {
    try {
        const rutaId = req.params.rutaId as string;

        if (!Types.ObjectId.isValid(rutaId)) {
            return res.status(400).json({ message: 'El ID de la ruta no es válido' });
        }

        const clanes = await Clan.find({ rutaId: new Types.ObjectId(rutaId) });
        const clanIds = clanes.map(clan => clan._id);
        
        const coders = await Coder.find({ clanId: { $in: clanIds } });
        res.json(coders);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar coders por ruta', error });
    }
});

export default router;
