import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import Trip from "../models/trip";

const packingPlannerRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

packingPlannerRouter.get("/trips", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Trip>("trips").find();
    const results = await cursor.toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

packingPlannerRouter.get("/trips/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const trip = await client.db().collection<Trip>("trips").findOne({ _id });
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    ("Cannot Find");
  }
});

packingPlannerRouter.post("/trips", async (req, res) => {
  try {
    const trip: Trip = req.body;
    const client = await getClient();
    const result = await client.db().collection<Trip>("trips").insertOne(trip);
    if (result.insertedId) {
      res.status(201).json(trip);
    } else {
      res.status(500).json({ message: "Failed to insert trip" });
    }
    return;
  } catch (err) {
    console.error("Cannot Address", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

packingPlannerRouter.delete("/trips/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Trip>("trips")
      .deleteOne({ _id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    ("Cannot Delete");
  }
});

packingPlannerRouter.put("/trips/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const updatedTrip: Trip = req.body;
    delete updatedTrip._id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Trip>("trips")
      .replaceOne({ _id }, updatedTrip);
    if (result.modifiedCount) {
      updatedTrip._id = _id;
      res.status(200).json(updatedTrip);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    ("Cannot update");
  }
});

export default packingPlannerRouter;
