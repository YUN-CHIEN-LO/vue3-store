import { findIndex } from "lodash";
import { lStorage, CART } from "@/plugins/webStorage";
export const global = {
  state: () => ({
    cart: lStorage.get(CART) !== null ? lStorage.get(CART) : [],
  }),

  actions: {
    /**
     * 新增項目至購物車
     *
     * @param {Store} context - 狀態倉儲
     * @param {object} val  - 新增的項目
     */
    addToCart({ commit }, val) {
      commit("addToCart", val);
    },
  },

  mutations: {
    /**
     * 新增項目至購物車
     *
     * @param {object} state - 狀態
     * @param {object} val - 新增的項目
     */
    addToCart(state, val) {
      const index = findIndex(state.cart, (x) => x.ProductId === val.ProductId);
      if (index === -1) {
        // 若此項目不存在於購物車
        state.cart.push(val);
      } else {
        const target = state.cart[index];
        if (target.color === val.color && target.size === val.size) {
          // 若購物車存在相同條件的項目
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
