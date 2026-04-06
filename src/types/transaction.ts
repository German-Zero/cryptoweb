export interface Transaction {
  id: number
  cryptoCode: 'BTC' | 'ETH' | 'USDT'
  quantity: number
  money: number
  action: string
  dateTime: string
}
