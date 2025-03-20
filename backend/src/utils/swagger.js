import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "../config/config.js";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Backend CRUD App",
            version: "1.0.0",
            description: "A simple Express API with Swagger documentation",
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}/api/v1`,
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
};

export default swaggerDocs;
