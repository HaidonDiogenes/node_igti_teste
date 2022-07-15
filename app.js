import express from "express";
import cors from "cors";
import winston from "./Log/winston.js";
import routeInit from "./routes/roteamentoRoute.js";

global.logger = await winston.Log();

const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use("/", routeInit.router);

app.use((err, req, res, next) => {
    logger.info(`${req.method} ${req.baseurl} ${err.message}}`);
    res.status(400).send({ error: err.message });
});


const port = 3100;
app.listen(port, () => {
    console.log("Serviço iniciado.");
    logger.info("Servidor iniciado.");
});