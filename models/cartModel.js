import query from "../database.js";

export const createCart = (userId) => {
    return query("INSERT INTO carts (userId) " + "VALUES (?) ", [userId]);
};

export const getCartDetailsByUserId = (userId) => {
    return query(
        "SELECT c.cartId, cd.productId, cd.quantity, p.productName, p.productImage, p.price, cd.quantity*p.price AS subtotal " +
            "FROM cart_details cd " +
            "INNER JOIN products p " +
            "ON cd.productId = p.productId " +
            "RIGHT JOIN carts c " +
            "ON (c.cartId=cd.cartId) " +
            "WHERE c.userId =?",
        [userId]
    );
};
export const addCartDetails = (cartId, productId, quantity) => {
    return query(
        "INSERT INTO cart_details (cartId, productId, quantity) " +
            "VALUES (?, ?,?) ",
        [cartId, productId, quantity]
    );
};

export const updateCartDetails = (quantity, cartId, productId) => {
    return query(
        "UPDATE cart_details " +
            "SET quantity=? " +
            "WHERE cartId = ? AND productId=?",
        [quantity, cartId, productId]
    );
};
// ??? should delete with cartId or userId
export const deleteCart = (userId) => {
    return query("DELETE FROM carts " + "WHERE userId=? ", [userId]);
};

export const deleteProductInCart = (cartId, productId) => {
    return query(
        "DELETE FROM cart_details " + "WHERE cartId=? AND productId = ?",
        [cartId, productId]
    );
};

export const emptyCart = (cartId) => {
    return query("DELETE FROM cart_details " + "WHERE cartId = ?", [cartId]);
};
