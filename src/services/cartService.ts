import { userRequest } from "../reqMethods";
import { CartProduct } from "../types/cart.type";

// Request payload type
interface CheckoutPayload {
  products: CartProduct[];
}

// Response type
interface OrderResponse {
  _id: string;
  [key: string]: any;
}

interface SessionResponse {
  url: string;
}

// Checkout function
export const checkout = async (products: CartProduct[]): Promise<string> => {
  // 1️⃣ Create order
  const orderRes = await userRequest.post<{ data: OrderResponse }>("/orders", {
    products,
  });

  const order = orderRes.data.data;

  if (!order?._id) throw new Error("Order creation failed");

  // 2️⃣ Create checkout session
  const sessionRes = await userRequest.post<SessionResponse>(
    `/orders/${order._id}/checkout`,
  );

  const session = sessionRes.data;
  console.log(session.url);
  if (!session.url) throw new Error("Checkout session failed");

  return session.url; // frontend can redirect to this URL
};
