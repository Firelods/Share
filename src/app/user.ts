import { ObjectId } from 'bson';
export interface User {
    _id: ObjectId;
    username: String;
    email: String;
    password: String;
    session: String;
}
