import jwt from "jsonwebtoken";
import { serial, ttlPrinc, ttlRfs } from './constantesseg.js';

function createToken(user) {
    try {
        console.log(user);
        let usuario = {
            Id: user.Id,
            Nome: user.Nome
        };
        var now = new Date;
        const token = jwt.sign(
            { id: usuario.Id, data: now.toGMTString() },
            serial,
            { expiresIn: ttlPrinc }
        );
        const tokenRefresh = jwt.sign(
            { id: usuario.Id, data: now.toGMTString() },
            serial,
            { expiresIn: ttlRfs }
        );

        let informacoes = {
            Nome: usuario.Nome,
            Token: `Bearer ${token}`,
            TokenRefresh: `Bearer ${tokenRefresh}`
        };
        return informacoes;

    } catch (err) {
        throw err;
    }
}

function validaToken(token) {

    let _token_ = token.substring(7, token.length);
    jwt.verify(_token_, serial, function (err, decoded) {
        if (err) {
            console.log(err.message)
        } else {
            if (decoded) {
                console.log(decoded.id)
            }
        } 
    });
}

export default {
    createToken,
    validaToken
}