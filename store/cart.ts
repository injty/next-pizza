import { Api } from "@/services/api-client";
import { create } from "zustand";

import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { getCartDetails } from "@/utils/helpers";
import { CartStateItem } from "@/utils/helpers/get-cart-details";

export interface CartState {
  addCartItem: (values: any) => Promise<void>;
  error: boolean;
  fetchCartItems: () => Promise<void>;
  items: CartStateItem[];

  loading: boolean;
  removeCartItem: (id: number) => Promise<void>;
  totalAmount: number;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ error: false, loading: true });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (err) {
      console.log(err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  error: false,
  fetchCartItems: async () => {
    try {
      set({ error: false, loading: true });
      const data = await Api.cart.fetchCart();
      console.log(data);
      set(getCartDetails(data));
    } catch (err) {
      console.log(err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  items: [],

  loading: true,

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({ error: false, items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)), loading: true }));
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (err) {
      console.log(err);
      set({ error: true });
    } finally {
      set((state) => ({ items: state.items.map((item) => ({ ...item, disabled: false })), loading: false }));
    }
  },

  totalAmount: 0,

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ error: false, loading: true });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (err) {
      console.log(err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
