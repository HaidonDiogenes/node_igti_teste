import winston from "winston";

async function Log() {

    const { combine, timestamp, label, printf } = winston.format;
    const myFormat = printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level} ${message}`;
    });

    return winston.createLogger({
        level: "silly",
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({
                filename: "./Log/historico-api.log"
            })
        ],
        format: combine(
            label({label:"historico-api"}),
            timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
            myFormat
        )
    });
}

export default {
    Log
}