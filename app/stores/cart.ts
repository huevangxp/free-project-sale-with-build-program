import { defineStore } from "pinia";
import type { Product } from "~/composables/useProducts";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  qty: number;
  colors: [string, string, string];
}

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);

  const count = computed(() =>
    items.value.reduce((sum, item) => sum + item.qty, 0),
  );
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0),
  );

  function add(product: Product, size: string, qty = 1) {
    const existing = items.value.find(
      (item) => item.id === product.id && item.size === size,
    );
    if (existing) {
      existing.qty += qty;
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size,
        qty,
        colors: product.colors,
      });
    }
  }

  function remove(id: number, size: string) {
    items.value = items.value.filter(
      (item) => !(item.id === id && item.size === size),
    );
  }

  function setQty(id: number, size: string, qty: number) {
    const item = items.value.find(
      (item) => item.id === id && item.size === size,
    );
    if (item) {
      item.qty = Math.max(1, qty);
    }
  }

  function clear() {
    items.value = [];
  }

  return { items, count, total, add, remove, setQty, clear };
});
