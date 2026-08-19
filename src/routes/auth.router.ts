import express, { type Request, type Response } from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión / Autenticación de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasena
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@riwi.com
 *               contrasena:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       400:
 *         description: Datos inválidos o contraseña muy corta
 */
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, contrasena } = req.body;

        if (!email || !contrasena) {
            return res.status(400).json({ 
                message: 'Error: El email y la contraseña son campos obligatorios.' 
            });
        }

        if (typeof email !== 'string' || typeof contrasena !== 'string') {
            return res.status(400).json({ 
                message: 'Error: Los datos enviados deben ser cadenas de texto.' 
            });
        }

        if (contrasena.length < 6) {
            return res.status(400).json({ 
                message: 'Error: La contraseña debe tener mínimo 6 caracteres o más.' 
            });
        }

        res.status(200).json({ 
            message: 'Validación exitosa. Datos listos para procesar.',
            email 
        });

    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
});

export default router;