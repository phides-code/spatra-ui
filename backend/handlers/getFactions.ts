import { Request, Response } from 'express';
import { MongoClient, MongoClientOptions } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as MongoClientOptions;

const getFactions = async (req: Request, res: Response) => {
    const client = new MongoClient(MONGO_URI, options);
    const dbName = 'spatraui';
    const collectionName = 'factions';

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected to DB:' + dbName);

        const factions = await db.collection(collectionName).find().toArray();

        if (!factions) {
            console.log('Factions not found');
            return res
                .status(500)
                .json({ httpStatus: 500, data: 'Factions not found' });
        }

        return res.status(200).json({ httpStatus: 200, data: factions });
    } catch (error: any) {
        console.log('getFactions caught error: ');
        console.log(error.message);
        return res.status(500).json({ httpStatus: 500, data: error.message });
    } finally {
        client.close();
        console.log('Disconnected.');
    }
};

export default getFactions;
