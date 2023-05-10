import { Request, Response } from 'express';

const getAgentStatus = async (req: Request, res: Response) => {
    // const ST_TOKEN = process.env.ST_TOKEN as string;
    // const ST_AGENT = process.env.ST_AGENT as string;

    return res.status(200).json({
        httpStatus: 200,
        data: 'ok',
    });
};

export default getAgentStatus;

/*
import { Request, Response } from 'express';
import { RandomObject } from '../shared/types';
import axios from 'axios';
import getPalette from './getPalette';

const getObject = async (req: Request, res: Response) => {
    const { objectId } = req.params;

    console.log('got objectId: ' + objectId);

    try {
        const axiosResponse = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
        );

        const object = (await axiosResponse.data) as RandomObject;
        const palette = await getPalette(object.primaryImage as string);
        object.palette = palette;

        return res.status(200).json({
            httpStatus: 200,
            data: object,
        });
    } catch (error: any) {
        console.log('getObject caught error: ');
        console.log(error.message);

        return res.status(500).json({
            httpStatus: 500,
            data: error.message,
        });
    }
};
*/
