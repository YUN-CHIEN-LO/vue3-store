import { createStore } from "vuex";
import { global } from "./module/global";
export default createStore({
  modules: {
    global,
  },
});
