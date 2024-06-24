import { ObjectId } from 'mongodb';

export default interface Trip {
    _id?: ObjectId,
    to: string,
}