import "express-async-errors";
import express from 'express';
import morgan from 'morgan';
let server = null;
const PORT = process.env.PORT || 3000;

async function start(api, repository) {
    const app = express();
    app.use(morgan('dev'));
    
    api(app, repository);

    app.use((err, req, res, next) => {
        console.error(err);
        res.sendStatus(500);
    })

    server = app.listen(PORT);
    return server;
}

async function stop() {
    if (server) await server.close();
    return true;
}

export default { start, stop, PORT }