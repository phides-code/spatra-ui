import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import createUserInDb from './handlers/createUserInDb';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../../frontend/build')));

// app.post('/api/agentStatus', getAgentStatus);
app.post('/api/createUserInDb', createUserInDb);

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`*** Server is running on port ${port} ***`);
});
