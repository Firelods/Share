export interface GroupeExpense {

    name: String,
    listUsers: [String],
    listMoney: [{ user1: String, user2: String, amount: { $numberDecimal: Number } }],
    history: [{ _idExpense: String }]
}
