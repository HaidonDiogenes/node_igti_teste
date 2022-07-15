import {serial} from './constantesseg.js';

function authorize(...allowed) {
    const isAllowed = role => allowed.indexOf(role) > -1;

    return (req, res, next) => {
        const authheader = req.headers["authorization"];
        const authheaderrefresh = req.headers["authorizationrefresh"];

        console.log(authheader);
        console.log(authheaderrefresh);
        
        if (!authheader || !authheader.startsWith('Bearer ')) {
            res.status(401).send("Token não existe.");
            return;
        }

        const token = authheader.substring(7, authheader.length);
        jwt.verify(token, serial, function (err, decoded) {
            if (err) {
                res.status(401).send("Token inválido.");
            }

        if (isAllowed(decoded.role)) {
            next();
        } else {
            res.status(403).send("Acesso não autorizado");
        }
        });
    }
}

export default {
    authorize
}