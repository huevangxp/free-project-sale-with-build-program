export default function hiddenOrderID(orderID: string) {
  // slice first 2 and last 2 characters
  return orderID.slice(0, 2) + "XXX" + orderID.slice(-2);
}
