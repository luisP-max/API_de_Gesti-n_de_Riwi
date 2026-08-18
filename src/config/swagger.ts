import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gestión de Riwi",
            version: "1.0.0",
            description: "Documentación oficial de los endpoints para TLs, Rutas, Clanes y Coders.",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Servidor Local de Desarrollo",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], 
};

export const swaggerSpec = swaggerJSDoc(options);
