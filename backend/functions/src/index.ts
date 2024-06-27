import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import packingPlannerRouter from './routes/packingPlannerRouter';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", packingPlannerRouter);


export const api = functions.https.onRequest(app);