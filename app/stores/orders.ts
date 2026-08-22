import { defineStore } from "pinia";
import type { CartItem } from "~/stores/cart";

export interface Order {
  id: string;
  date: string;
  name: string;
  phone: string;
  address: string;
  note?: string;
  /** Payment code, translated via checkout.{code} */
  payment: "cod" | "transfer";
  /** Status code, translated via orders.status.{code} */
  status: "pending" | "shipping" | "delivered";
  items: CartItem[];
  total: number;
}

const ORDERS_KEY = "shop_orders";

export const useOrdersStore = defineStore("orders", () => {
  const orders = ref<Order[]>([]);

  if (import.meta.client) {
    try {
      orders.value = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    } catch {
      orders.value = [];
    }
    watch(
      orders,
      (value) => localStorage.setItem(ORDERS_KEY, JSON.stringify(value)),
      { deep: true },
    );
  }

  function place(
    info: {
      name: string;
      phone: string;
      address: string;
      note?: string;
      payment: "cod" | "transfer";
    },
    items: CartItem[],
    total: number,
  ): Order {
    const order: Order = {
      id: "ORD" + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      status: "ລໍຖ້າຢືນຢັນ",
      items: JSON.parse(JSON.stringify(items)),
      total,
      ...info,
    };
    orders.value.unshift(order);
    return order;
  }

  const byPhone = (phone: string) =>
    orders.value.filter((order) => order.phone === phone);

  return { orders, place, byPhone };
});
