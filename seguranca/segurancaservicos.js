import jsontoken from './jsontoken.js';
import autorizacao from './autorizacao.js';

function createToken(user) {
    return jsontoken.createToken(user);
}

function authorize(...allowed) {
    return autorizacao.authorize(...allowed);
}

function validaToken(token) {
    let primeirotoken = token.token;
    let segundotoken = token.tokenrefresh;
    let primeirovalor = jsontoken.validaToken(primeirotoken);
    let segundovalor = jsontoken.validaToken(segundotoken);

}

export default {
    createToken,
    validaToken,
    authorize
}