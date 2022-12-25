export interface GroupeExpense {
    tag: string,
    name: string,
    listUsers: [string],
    listMoney: [{ user1: string, user2: string, amount: { $numberDecimal: Number } }],
    history: [{ _idExpense: string }]
}
