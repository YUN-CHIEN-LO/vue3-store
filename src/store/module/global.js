export const global = {
  state: () => ({
    catagory: "WOMEN",
  }),

  actions: {
    setCatagory({ commit }, val) {
      commit("setCatagory", val);
    },
  },

  mutations: {
    setCatagory(state, val) {
      state.catagory = val;
    },
  },

  getters: {
    getCatagory(state) {
      return state.catagory;
    },
  },
};
