import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import packingPlannerRouter from './routes/packingPlannerRouter';
import weatherRouter from './routes/weatherRouter';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", packingPlannerRouter);
app.use("/", weatherRouter);


export const api = functions.https.onRequest(app);