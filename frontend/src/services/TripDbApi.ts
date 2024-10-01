import axios from "axios";
import Trip from "../models/trip";
const baseUrl: string = import.meta.env.VITE_API_URL || "";
console.log("Base URL being used:", baseUrl);

export const getTrips = async (): Promise<Trip[]> => {
  return (await axios.get(`${baseUrl}/trips`)).data;
};

export const addTrip = async (trip: Trip): Promise<Trip> => {
  console.log("Sending trip to database:", trip);
  if (trip.weather) {
    trip.weather = Array.isArray(trip.weather) ? trip.weather : [trip.weather];
  }
  return (await axios.post(`${baseUrl}/trips`, trip)).data;
};

export const editTrip = async (trip: Trip, id: string): Promise<Trip> => {
  if (trip.weather) {
    trip.weather = Array.isArray(trip.weather) ? trip.weather : [trip.weather];
  }
  return (await axios.put(`${baseUrl}/trips/${encodeURIComponent(id)}`, trip))
    .data;
};

export const deleteTrip = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/trips/${encodeURIComponent(id)}`);
};
