import * as functions from 'firebase-functions/v1';
import express from 'express';
import cors from 'cors';
import packingPlannerRouter from './routes/packingPlannerRouter';
import weatherRouter from './routes/weatherRouter';
const app = express();
// app.use(cors());
app.use(cors({ origin: true }));
app.use(express.json());
app.use("/", packingPlannerRouter);
app.use("/", weatherRouter);


// export const api = functions.https.onRequest(app);
export const api = functions
  .runWith({
    // Specify 1st Gen compatible options only
    memory: "256MB",  // 1st Gen supports 128MB, 256MB, 512MB, 1GB, 2GB
    timeoutSeconds: 60,  // Max 9 minutes (540 seconds) for 1st Gen
  })
  .https.onRequest(app);