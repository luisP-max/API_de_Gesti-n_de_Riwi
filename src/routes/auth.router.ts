import express, { type Request, type Response } from 'express';
import { body, validationResult } from 'express-validator';

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
 *         description: Datos inválidos
 */
router.post(
    '/login',
    [
        body('email')
            .notEmpty().withMessage('El email es obligatorio.')
            .isEmail().withMessage('El formato del email no es válido (ej: hola1@hola.com).'),
        
        body('contrasena')
            .notEmpty().withMessage('La contraseña es obligatoria.')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres o más.')
    ],
    async (req: Request, res: Response) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ 
                message: 'Error de validación en los datos de entrada.',
                errors: errores.array() 
            });
        }

        try {
            const { email } = req.body;

            res.status(200).json({ 
                message: 'Validación exitosa.',
                email 
            });

        } catch (error) {
            res.status(500).json({ message: 'Error interno del servidor', error });
        }
    }
);

export default router;