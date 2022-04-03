import query from "../database.js";

export const createOrder = (userId, orderDate, orderStatus, localPickup, comments) => {
  return query("INSERT INTO orders (userId, orderDate, orderStatus, localPickup, comments) " +
    "VALUES (?,?,?,?,?)", [userId, orderDate, orderStatus, localPickup, comments])
}

export const createOrderDetails = (orderId, productId, quantity, priceEach) => {
  return query("INSERT INTO order_details (orderId, productId, quantity, priceEach) " +
    "VALUES (?,?,?,?)", [orderId, productId, quantity, priceEach])
}

export const getOrderDetails = (orderId) => {
  return query("SELECT o.userId, o.orderDate, o.orderStatus, o.localPickup, o.comments, od.productId, od.quantity, od.priceEach " +
    "FROM orders o " +
    "INNER JOIN order_details od " +
    "ON o.orderId = od.orderId AND o.orderId=?", [orderId])
}
export const getAllOrders = () => {
  return query("SELECT o.orderId, o.userId, o.orderDate, o.orderStatus, sum(od.quantity*od.priceEach) as total " +
    "FROM orders o " +
    "INNER JOIN order_details od " +
    "ON o.orderId = od.orderId " +
    "group by od.orderId")
}