import { ObjectId } from "mongodb";

export default interface Trip {
    _id?: ObjectId,
    to: string,
    dates: string,
    shorts: number,
    pants: number,
    shirts: number,
    socks: number,
    underwear: number,
    sweatshirt: number,
    jacket: number,
    complete: boolean,
}
