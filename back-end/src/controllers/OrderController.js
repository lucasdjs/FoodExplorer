import { createOrderService, createOrderServiceFinish } from "../services/CreateOrderService.js";
import { getOrderById, getOrderFinishById, getOrderFinishByUserId, getOrderFinish } from "../services/GetOrderService.js";
import { deleteOrder, updateOrderService } from "../services/DeleteOrderService.js";

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await createOrderService(orderData);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const createOrderFinish = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await createOrderServiceFinish(orderData);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const dishes = await getOrderById(id);
    res.status(200).json(dishes);
  }
  catch (error) {
    console.error("Ocorreu um erro ao buscar os pedidos", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getOrderByIdController = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await getOrderFinishById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Ordem não encontrada' });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar a ordem pelo ID' });
  }
};

export const getOrderByUserIdController = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await getOrderFinishByUserId(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Ordem não encontrada' });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar a ordem pelo ID' });
  }
};

export const getOrdersFinish = async (req, res) => {
  try {
    const orders = await getOrderFinish();
    if (!orders) {
      return res.status(404).json({ message: 'Ordens não encontradas' });
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar a ordem pelo ID' });
  }
};

export const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const response = await updateOrderService(id, status);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteOrderById = async (req, res) => {
  const { id } = req.body;
  console.log(id)
  try {
    const response = await deleteOrder(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
