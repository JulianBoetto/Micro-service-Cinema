
import { MongoClient } from 'mongodb';
let client = null;

async function connect() {
    if (!client)
        client = new MongoClient(process.env.MONGO_CONNECTION);

    await client.connect();
    return client.db(process.env.DATABASE_NAME);
}

async function disconnect() {
    if (!client) return true;
    await client.close();
    client = null;
    return true;
}

export default { connect, disconnect }