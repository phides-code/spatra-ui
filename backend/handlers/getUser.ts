import { Request, Response } from 'express';
import { MongoClient, MongoClientOptions } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as MongoClientOptions;

const getUser = async (req: Request, res: Response) => {
    console.log('got req.body: ');
    console.log(req.body);
    console.log('Checking user: ' + req.body.email);

    const client = new MongoClient(MONGO_URI, options);
    const dbName = 'spatraui';
    const collectionName = 'users';

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected to DB:' + dbName);

        const foundUser = await db
            .collection(collectionName)
            .findOne({ _id: req.body.email });

        if (!foundUser) {
            console.log('User not found');
            return res
                .status(500)
                .json({ httpStatus: 500, data: 'User not found' });
        }

        if (req.body.sub !== foundUser.sub) {
            console.log('Unauthorized');
            return res
                .status(500)
                .json({ httpStatus: 500, data: 'Unauthorized' });
        }

        return res.status(200).json({ httpStatus: 200, data: foundUser });
    } catch (error: any) {
        console.log('getUser caught error: ');
        console.log(error.message);
        return res.status(500).json({ httpStatus: 500, data: error.message });
    } finally {
        client.close();
        console.log('Disconnected.');
    }
};

export default getUser;
