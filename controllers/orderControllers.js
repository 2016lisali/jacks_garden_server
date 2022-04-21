import * as orderModel from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  const order = req.body;
  try {
    const result = await orderModel.createOrder(order.userId, order.orderDate, order.orderAmount, order.orderStatus, order.localPickup, order.comments)
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

export const createOrderBillingDetails = async (req, res) => {
  const details = req.body;
  try {
    const result = await orderModel.createOrderBillingDetails(details.orderId, details.name, details.email, details.phone, details.line1, details.line2, details.city, details.state, details.postal_code)
    res.status(201).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json("Can not create order details, query error")
  }
}

export const getOrderDetails = async (req, res) => {
  try {
    const result = await orderModel.getOrderDetails(req.params.id);
    result.length > 0 ?
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
    console.log(result);
    result.length > 0 ?
      res.status(200).json(result) :
      res.status(404).json("Order not found")
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

export const getOrderBillingDetails = async (req, res) => {
  console.log("get Billing details");
  try {
    const result = await orderModel.getOrderBillingDetailsByOrderId(req.params.id);
    console.log(result);
    result.length > 0 ?
      res.status(200).json(result) :
      res.status(404).json("Order not found")
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}