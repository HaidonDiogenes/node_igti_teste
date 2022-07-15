import express from "express";
import controller from '../controllers/autenticacaoController.js';

const router = express.Router();

router.post("/autenticacao", (req, res) => { 
    controller.autenticar(req, res);
});

router.post("/validartoken", (req, res) => { 
    controller.validarToken(req, res);
});

router.use((err, req, res, next) => {
    logger.info(`${req.method} ${req.baseurl} ${err.message}}`);
    res.status(400).send({ error: err.message });
});


export default {
    router
}