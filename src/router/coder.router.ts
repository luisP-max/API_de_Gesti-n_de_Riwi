import express, { type Request, type Response } from 'express';
import { Coder } from '../models/coder.model.js';
import { Types } from 'mongoose'; 
const router = express.Router();

/**
 * @swagger
 * /api/coders:
 *   post:
 *     summary: Crear un Coder
 *     tags: [Coders]
 *   get:
 *     summary: Obtener todos los Coders con su Clan
 *     tags: [Coders]
 */

// --- CRUD: CREAR ---
router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, email, estado, clanId } = req.body;
        // NOTA: Aquí deberías validar que el clanId exista en la BD para cumplir el Criterio 6
        const nuevoCoder = await Coder.create({ nombre, email, estado, clanId });
        res.status(201).json({ message: 'Coder creado', coder: nuevoCoder });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el coder', error });
    }
});

// --- CRUD: CONSULTAR TODOS ---
router.get('/', async (req: Request, res: Response) => {
    try {
        const coders = await Coder.find().populate('clanId');
        res.json(coders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener coders', error });
    }
});

// --- CRUD: ACTUALIZAR ---
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { nombre, email, estado, clanId } = req.body;
        const coder = await Coder.findByIdAndUpdate(
            req.params.id, 
            { nombre, email, estado, clanId }, 
            { new: true, runValidators: true }
        );
        if (!coder) return res.status(404).json({ message: 'Coder no encontrado' });
        res.json({ message: 'Coder actualizado', coder });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar', error });
    }
});

// --- CRUD: ELIMINAR ---
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const coder = await Coder.findByIdAndDelete(req.params.id);
        if (!coder) return res.status(404).json({ message: 'Coder no encontrado' });
        res.json({ message: 'Coder eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error });
    }
});

// --- CONSULTA ESPECIAL: CODERS POR CLAN ---
router.get('/clan/:clanId', async (req: Request, res: Response) => {
    try {
        const clanId = req.params.clanId as string;
        
        if (!Types.ObjectId.isValid(clanId)) {
            return res.status(400).json({ message: 'El ID del clan no es válido' });
        }
        
        const coders = await Coder.find({ clanId: new Types.ObjectId(clanId) });
        res.json(coders);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar por clan', error });
    }
});


export default router;
