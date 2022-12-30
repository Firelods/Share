export interface GroupeExpense {
  _id: string;
  tag: string,
  name: string,
  listUsers: [string],
  listMoney: [{ user1: string, user2: string, amount: { $numberDecimal: Number } }],
  history: [{ _idExpense: string }]
}
