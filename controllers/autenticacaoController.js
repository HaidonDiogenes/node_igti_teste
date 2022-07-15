import segservices from '../seguranca/segurancaservicos.js';

async function autenticar(req, res) {
    let usuario = req.body;
    console.log(usuario);
    try {
        const resultado = {
            Id: 1,
            Nome: "Jose Alves",
            Conexao: true
        };

        if (!usuario.Nome) {
            res.status(401).json({ Message: "Usuário não foi espeficado.", Tipo: "erro" });
            logger.info(`POST /autenticacao USUÁRIO NULO.`);
            res.end();
        }
        else if (!usuario.Pass) {
            res.status(401).json({ Message: "Senha não foi espeficada.", Tipo: "erro" });
            logger.info(`POST /autenticacao ${JSON.stringify(usuario.Nome)} SENHA NULA.`);
            res.end();
        }
        else if (resultado.Conexao == false) {
            res.status(401).json({ Message: `Srv - Conexão perdida.`, Tipo: "erro" });
            logger.info(`POST /autenticacao ${JSON.stringify(usuario.Nome)} Srv - Cnx.`);
            res.end();
        }
        else if (resultado.Conexao == true && resultado.Id == null) {
            res.status(401).json({ Message: "Usuário ou senha inválida.", Tipo: "erro" });
            logger.info(`POST /autenticacao ${JSON.stringify(usuario.Nome)} Usuário ou senha inválida.`);
            res.end();
        }
        else {
            let token = segservices.createToken(resultado);
            logger.info(`POST /autenticacao ${JSON.stringify(usuario.Nome)}`);
            res.status(201).json(token);
        }
    }
    catch (err) {
        res.status(401).json({ Message: `Usuário ou senha inválida.`, Tipo: "erro" });
        logger.info(`POST /autenticacao ${JSON.stringify(usuario.Nome)} ${err}`);
        res.end();
    }
}

async function validarToken(req, res) {

    let tokens = {
        token: req.headers["authorization"],
        tokenrefresh: req.headers["authorizationrefresh"]
    };
    segservices.validaToken(tokens);
}

export default {
    autenticar,
    validarToken
}