import { ObjectId } from "mongodb";
import { Weather } from "./weather";

export default interface Trip {
  _id?: ObjectId;
  name: string;
  to: string;
  shorts?: number;
  pants?: number;
  shirts?: number;
  socks?: number;
  underwear?: number;
  sweatshirt?: number;
  jacket?: number;
  complete: boolean;
  weather: Weather;
  duration?: number;
}
