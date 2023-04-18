import express, { json } from 'express';
import httpProxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(json());

const options = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl;
    }
}

const moviesServiceProxy = httpProxy(process.env.MOVIES_API, options);
const catalogServiceProxy = httpProxy(process.env.CATALOG_API, options);

app.use('/movies', moviesServiceProxy);

app.get(/cities|cinemas/i, catalogServiceProxy);

const server = app.listen(process.env.PORT, () => {
    console.log(`API Gateway started at ${process.env.PORT}`)
})

export default server;