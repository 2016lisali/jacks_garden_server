import * as cartModel from "../models/cartModel.js";

export const createCart = async (req, res) => {
    const userId = req.query.userId;
    // if (userId != req.user.userId && req.user.isAdmin != 1) return res.status(403).json("You are not authorized")
    try {
        const result = await cartModel.createCart(userId);
        res.status(201).json(result.insertId);
    } catch (error) {
        console.log(error);
        res.status(500).json(`cannot create cart for userId ${userId}`);
    }
};

export const getCartDetailsByUserId = async (req, res) => {
    // if (req.query.userId != req.user.userId && req.user.isAdmin != 1) return res.status(403).json("You are not authorized")
    try {
        const result = await cartModel.getCartDetailsByUserId(req.query.userId);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json("Cannot get cart details by userId");
    }
};

export const addCartDetails = async (req, res) => {
    const { cartId, userId, productId, quantity } = req.body;
    // if (userId != req.user.userId) return res.status(403).json("You are not authorized")
    try {
        const result = await cartModel.addCartDetails(
            cartId,
            productId,
            quantity
        );
        res.status(201).json("Product has been added to the cart");
    } catch (error) {
        console.log(error);
        res.status(500).json("Cannot add product to cart, query error");
    }
};

export const updateCartDetails = async (req, res) => {
    const { quantity, cartId, userId, productId } = req.body;
    // console.log("userId", userId);
    // console.log("req.user.userId", req.user.userId);
    // if (userId != req.user.userId) return res.status(403).json("You are not authorized")
    try {
        const result = await cartModel.updateCartDetails(
            quantity,
            cartId,
            productId
        );
        if (result.affectedRows > 0)
            return res.status(200).json("Cart has been updated");
        res.status(204).json("Cart cannot be updated");
    } catch (error) {
        console.log(error);
        res.status(500).json("Cannot update cart details, query error");
    }
};

export const deleteProductInCart = async (req, res) => {
    const cartId = req.params.id;
    const productId = req.query.productId;
    // if (req.body.userId != req.user.userId) return res.status(403).json("You are not authorized")
    try {
        const result = await cartModel.deleteProductInCart(cartId, productId);
        if (result.affectedRows > 0)
            return res.status(200).json("Product has been deleted");
        res.status(204).json("No such product in cart");
    } catch (error) {
        console.log(error);
        res.status(500).json("Can not delete product from cart");
    }
};

export const emptyCart = async (req, res) => {
    // if (req.body.userId != req.user.userId) return res.status(403).json("You are not authorized")
    try {
        const result = await cartModel.emptyCart(req.params.id);
        if (result.affectedRows > 0)
            return res.status(200).json("Cart already emptied");
        res.status(204).json("Cart not exist");
    } catch (error) {
        console.log(error);
        res.status(500).json("Cart can not be emptied, query error");
    }
};
