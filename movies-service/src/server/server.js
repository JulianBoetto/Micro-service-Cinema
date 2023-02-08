import "express-async-errors";
import express from 'express';
import morgan from 'morgan';
let server = null;
const MS_NAME = process.env.MS_NAME;

async function start(api, repository) {
    const app = express();
    app.use(morgan('dev'));

    app.get("/health", (req, res, next) => {
        res.status(200).send(`The service ${MS_NAME} is running at ${process.env.PORT}`)
    })
    
    api(app, repository);

    app.use((err, req, res, next) => {
        console.error(err);
        res.sendStatus(500);
    })

    server = app.listen(process.env.PORT);
    return server;
}

async function stop() {
    if (server) await server.close();
    return true;
}

export default { start, stop }