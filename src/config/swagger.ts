import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión de Riwi",
      version: "1.0.0",
      description: "Documentación oficial desarrollada con Express y TypeScript para la gestión de TLs, Rutas, Clanes y Coders.",
    },
    components: {
      schemas: {
        TL: {
          type: "object",
          required: ["nombre", "cargo"],
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            nombre: { type: "string", example: "Luis" },
            cargo: { type: "string", example: "Trainer Senior" }
          }
        },
        Ruta: {
          type: "object",
          required: ["nombre", "tlId"],
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            nombre: { type: "string", example: "Backend Node.js" },
            tlId: { type: "string", description: "ID o documento poblado del TL" }
          }
        },
        Clan: {
          type: "object",
          required: ["nombre", "rutaId"],
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d3" },
            nombre: { type: "string", example: "Clan Centurion" },
            rutaId: { type: "string", description: "ID o documento poblado de la Ruta" }
          }
        },
        Coder: {
          type: "object",
          required: ["nombre", "email", "estado", "clanId"],
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d4" },
            nombre: { type: "string", example: "Carlos Pérez" },
            email: { type: "string", example: "carlos@riwi.com" },
            estado: { type: "string", enum: ["activo", "inactivo", "graduado"], example: "activo" },
            clanId: { type: "string", description: "ID o documento poblado del Clan" }
          }
        }
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local"
      }
    ]
  },
  apis: ["./src/routes/*.ts", "./src/routes/*.js"]
};

export const swaggerSpec = swaggerJSDoc(options);

