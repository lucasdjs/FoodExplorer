import { createOrderService } from "../services/CreateOrderService.js";
import { getOrderById } from "../services/GetOrderService.js";

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

export const getOrder = async (req, res) => {
  console.log(req.params)
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
