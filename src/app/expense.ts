import { ObjectId } from 'bson';
export interface Expense {
    title: String,
    description: String,
    date: String,
    amount: { $numberDecimal: Number },
    owner: ObjectId,
    listUsers: [ObjectId],
}
