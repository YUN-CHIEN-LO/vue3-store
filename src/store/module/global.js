import { findIndex } from "lodash";
import { lStorage, CART } from "@/plugins/webStorage";
export const global = {
  state: () => ({
    cart: lStorage.get(CART) !== null ? lStorage.get(CART) : [],
  }),

  actions: {
    addToCart({ commit }, val) {
      commit("addToCart", val);
    },
  },

  mutations: {
    addToCart(state, val) {
      const index = findIndex(state.cart, (x) => x.ProductId === val.ProductId);
      if (index === -1) {
        state.cart.push(val);
      } else {
        const target = state.cart[index];
        if (target.color === val.color && target.size === val.size) {
          target.number += val.number;
        } else {
          state.cart.push(val);
        }
      }
      lStorage.set(CART, state.cart);
    },
  },

  getters: {
    cart(state) {
      return state.cart;
    },
  },
};
