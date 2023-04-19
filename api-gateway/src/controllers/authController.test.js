import { test, expect, beforeAll, afterAll } from '@jest/globals';
import app from '../server/index';
import request from 'supertest';
import repository from '../repository/repository.js';
import { ObjectId } from 'mongodb';

const loginOk = {
    email: 'julib_8724@hotmail.com',
    password: '123456'
};

const loginNOk = {
    email: 'julib_8724@hotmail.com',
    password: '12345'
};

let token = '';
const tokenBlocklist = new ObjectId().toHexString();

beforeAll(async () => {
    process.env.PORT = 4001;

    const response = await request(app)
        .post('/login/')
        .set('Content-Type', 'application/json')
        .send(loginOk);
    token = response.body.token;

    await repository.blocklistToken(tokenBlocklist);
})

afterAll(async () => {
    await app.close();
})

test('POST /login/ 200 OK', async () => {
    const response = await request(app)
        .post('/login/')
        .set('Content-Type', 'application/json')
        .send(loginOk);

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
})

test('POST /login/ 422 UNPROCESSABLE ENTITY', async () => {
    loginOk.data = new Date();

    const response = await request(app)
        .post('/login/')
        .set('Content-Type', 'application/json')
        .send(loginOk);

    expect(response.status).toEqual(422);
})

test('POST /login/ 401 UNAUTHORIZED', async () => {
    const response = await request(app)
        .post('/login/')
        .set('Content-Type', 'application/json')
        .send(loginNOk);

    expect(response.status).toEqual(401);
})

test('DELTE /logout/ 200 OK', async () => {
    const response = await request(app)
        .delete('/logout/')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
})

test('DELETE /logout/ 401', async () => {
    const response = await request(app)
        .delete('/logout/')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}1`);

    expect(response.status).toEqual(401);
})

test('DELETE /logout/ 401 (Blacklist)', async () => {
    const response = await request(app)
        .delete('/logout/')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${tokenBlocklist}`);

    expect(response.status).toEqual(401);
})