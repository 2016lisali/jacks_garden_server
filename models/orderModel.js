import query from "../database.js";

export const createOrder = (userId, orderDate, orderAmount, orderStatus, localPickup, comments) => {
  return query("INSERT INTO orders (userId, orderDate, orderAmount, orderStatus, localPickup, comments) " +
    "VALUES (?,?,?,?,?,?)", [userId, orderDate, orderAmount, orderStatus, localPickup, comments])
}

export const createOrderDetails = (orderId, productId, quantity, priceEach) => {
  return query("INSERT INTO order_details (orderId, productId, quantity, priceEach) " +
    "VALUES (?,?,?,?)", [orderId, productId, quantity, priceEach])
}

export const createOrderBillingDetails = (orderId, name, email, phone, line1, line2, city, state, postal_code) => {
  return query("INSERT INTO orders_billing_details (orderId, name, email, phone, line1, line2, city, state, postal_code) " +
    "VALUES (?,?,?,?, ?, ?, ?, ?, ?)", [orderId, name, email, phone, line1, line2, city, state, postal_code])
}

export const getOrderDetails = (orderId) => {
  return query(`SELECT o.userId, o.orderDate, o.orderStatus, o.localPickup, o.comments, 
      od.productId, od.quantity, od.priceEach, p.productName, p.price, u.firstName,
      u.lastName, u.email ` +
    "FROM orders o " +
    "INNER JOIN order_details od " +
    "ON o.orderId = od.orderId AND o.orderId=? " +
    "INNER JOIN products p " +
    "ON od.productId=p.productId " +
    "INNER JOIN orders_billing_details obd " +
    "ON obd.orderId=o.orderId " +
    "INNER JOIN users u " +
    "ON u.userId=o.userId", [orderId])
}
export const getAllOrders = () => {
  return query("SELECT o.orderId, o.userId, o.orderDate, o.orderStatus, sum(od.quantity*od.priceEach) as total, u.email, u.firstName, u.lastName " +
    "FROM orders o " +
    "INNER JOIN order_details od " +
    "ON o.orderId = od.orderId " +
    "INNER JOIN users u " +
    "ON u.userId=o.userId " +
    "group by od.orderId")
}

export const getOrderBillingDetailsByOrderId = (orderId) => {
  return query("SELECT * FROM orders_billing_details " +
    "WHERE orderId=?", [orderId])
}