import { ObjectId } from 'bson';
export interface Expense {
    title: String,
    description: String,
    date: String,
    amount: Number,
    owner: ObjectId,
    listUsers: [ObjectId],
}
