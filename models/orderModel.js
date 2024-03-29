import query from "../database.js";

export const createOrder = (
    userId,
    orderDate,
    orderAmount,
    orderStatus,
    localPickup,
    comments
) => {
    return query(
        "INSERT INTO orders (userId, orderDate, orderAmount, orderStatus, localPickup, comments) " +
            "VALUES (?,?,?,?,?,?)",
        [userId, orderDate, orderAmount, orderStatus, localPickup, comments]
    );
};

export const createOrderDetails = (orderId, productId, quantity, priceEach) => {
    return query(
        "INSERT INTO order_details (orderId, productId, quantity, priceEach) " +
            "VALUES (?,?,?,?)",
        [orderId, productId, quantity, priceEach]
    );
};

export const createOrderBillingDetails = (
    orderId,
    name,
    email,
    phone,
    line1,
    line2,
    city,
    state,
    postal_code
) => {
    return query(
        "INSERT INTO orders_billing_details (orderId, name, email, phone, line1, line2, city, state, postal_code) " +
            "VALUES (?,?,?,?, ?, ?, ?, ?, ?)",
        [orderId, name, email, phone, line1, line2, city, state, postal_code]
    );
};

export const getOrderDetails = (orderId) => {
    return query(
        `SELECT o.userId, o.orderDate, o.orderStatus, o.localPickup, o.comments, 
      od.productId, od.quantity, od.priceEach, p.productName, p.price, u.firstName,
      u.lastName, u.email ` +
            "FROM orders o " +
            "INNER JOIN order_details od " +
            "ON o.orderId = od.orderId AND o.orderId=? " +
            "INNER JOIN products p " +
            "ON od.productId=p.productId " +
            "INNER JOIN users u " +
            "ON u.userId=o.userId",
        [orderId]
    );
};
export const getOrdersByUserId = (userId) => {
    return query(
        "SELECT o.orderId, o.orderDate, o.orderAmount, o.orderStatus, o.localPickup, o.comments, u.userId " +
            "FROM users u " +
            "INNER JOIN orders o " +
            "ON u.userId=o.userId AND u.userId=? " +
            "ORDER BY o.orderDate DESC",
        [userId]
    );
};
export const getAllOrders = () => {
    return query(
        "SELECT o.orderId, o.userId, o.orderDate, o.orderStatus, sum(od.quantity*od.priceEach) as total, u.email, u.firstName, u.lastName " +
            "FROM orders o " +
            "INNER JOIN order_details od " +
            "ON o.orderId = od.orderId " +
            "INNER JOIN users u " +
            "ON u.userId=o.userId " +
            "GROUP BY od.orderId " +
            "ORDER BY orderDate DESC"
    );
};

export const getOrderBillingDetailsByOrderId = (orderId) => {
    return query("SELECT * FROM orders_billing_details " + "WHERE orderId=?", [
        orderId,
    ]);
};

export const getOrderTotalAmount = () => {
    return query(
        "SELECT MONTH(orderDate) as month, sum(orderAmount) as totalAmount " +
            "From orders " +
            "GROUP BY month " +
            "ORDER BY month"
    );
};

export const updateOrderStatus = (status, orderId) => {
    return query("UPDATE orders " + "SET orderStatus=? " + "WHERE orderId=?", [
        status,
        orderId,
    ]);
};

export const deleteOrder = (orderId) => {
    return query("DELETE FROM orders " + "WHERE orderId=? ", [orderId]);
};
