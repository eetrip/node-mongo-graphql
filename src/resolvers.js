import db from './db';
import { ObjectId } from 'mongodb';

export const resolvers = {
    Query: {
        ping: () => 'pong',
        cats: () => listCats(),
        dogs: () => listDogs(),
        groups: () => listGroups()
    },
    Mutation: {
        createCat: (_, { name }) => createCat({ name }),
        createDog: (_, { breed }) => createDog({ breed }),
        createGroup: (_, {
            userId, name, groupType
        }) => createGroup({ userId, name, groupType })
    }
};

// checkUserRole
const checkUserRole = async (_id) => {
    const user = await db.get().collection('users').findOne({
        _id: ObjectId(_id), roll: 1
    });
    console.log(user);
    if (user) return true;
};

//cats
const createCat = async (input) => {
    const {
        ops: [ databaseResponse ]
    } = await db.get().collection('cats').insertOne(input);
    return databaseResponse ?? { message: 'something went wrong' };
};

const listCats = () => db.get().collection('cats').find().toArray();

// dogs
const createDog = async (input) => {
    const {
        ops: [ databaseResponse ]
    } = await db.get().collection('dogs').insertOne(input);
    return databaseResponse ?? { message: 'something went wrong' };
};

const listDogs = () => db.get().collection('dogs').find().toArray();

// groups
const createGroup = async ({ userId, name, groupType }) => {
    const valid = await checkUserRole(userId);
    if (valid) {
        const {
            ops: [ databaseResponse ]
        } = await db.get().collection('groups').insertOne({ name, groupType });
        return databaseResponse ?? { message: 'something went wrong while creating group' };
    };
    return null;
};

const listGroups = () => db.get().collection('groups').find().toArray();