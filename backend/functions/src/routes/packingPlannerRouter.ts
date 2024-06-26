import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import Trip from "../models/trip";

const packingPlannerRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// get all Shoutouts
packingPlannerRouter.get("/shoutouts", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Trip>("trips").find();
    const results = await cursor.toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

// get Shoutout by ID
packingPlannerRouter.get("/shoutouts/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const shoutout = await client
      .db()
      .collection<Trip>("trips")
      .findOne({ _id });
    if (shoutout) {
      res.status(200).json(shoutout);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    ("Cannot Find");
  }
});

// create new Shoutout
packingPlannerRouter.post("/shoutouts", async (req, res) => {
  try {
    const shoutout: Trip = req.body;
    const client = await getClient();
    await client.db().collection<Trip>("trips").insertOne(shoutout);
    res.status(201).json(shoutout);
  } catch (err) {
    ("Cannot Address");
  }
});

// delete Shoutout by ID
packingPlannerRouter.delete("/shoutouts/:id", async (req, res) => {
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

// replace / update Shoutout by ID
packingPlannerRouter.put("/shoutouts/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const updatedShoutout: Trip = req.body;
    delete updatedShoutout._id; // remove _id from body so we only have one.
    const client = await getClient();
    const result = await client
      .db()
      .collection<Trip>("trips")
      .replaceOne({ _id }, updatedShoutout);
    if (result.modifiedCount) {
      updatedShoutout._id = _id;
      res.status(200).json(updatedShoutout);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    ("Cannot update");
  }
});

export default packingPlannerRouter;
