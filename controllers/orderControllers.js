import * as orderModel from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  const order = req.body;
  try {
    const result = await orderModel.createOrder(order.userId, order.orderDate, order.orderStatus, order.localPickup, order.comments)
    res.status(201).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json("Can not create order, query error")
  }
}

export const createOrderDetails = async (req, res) => {
  const order = req.body;
  try {
    const result = await orderModel.createOrderDetails(order.orderId, order.productId, order.quantity, order.priceEach)
    res.status(201).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json("Can not create order details, query error")
  }
}

export const getOrderDetails = async (req, res) => {
  try {
    const result = await orderModel.getOrderDetails(req.params.id);
    result.affectedRows > 0 ?
      res.status(200).json(result) :
      res.status(404).json("Order not found")
  } catch (error) {
    console.log(error);
    res.status(500).json("Can not get order details, query error")
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const result = await orderModel.getAllOrders();
    result.affectedRows > 0 ?
      res.status(200).json(result) :
      res.status(404).json("User not found")
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}