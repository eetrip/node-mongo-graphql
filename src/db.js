import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const dbUrl = process.env.DEV_DB_URI;
const devDb = process.env.DEV_DB;

const { MongoClient } = mongodb;

const dbClient = new MongoClient(
    dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

class Database {
    constructor() {};
    createConnection = () => dbClient.connect().then(
        () => console.log(`connected to db - ${devDb}`)
    );
    get = () => dbClient.db(`${devDb}`); //different database can be called
};

const get = (collection) => new Database().get();

export default {
    Database,
    get
};