import { createStore } from "vuex";
import coaches from "./coaches/index.js";
import messages from "./messages/index.js";
import auth from "./auth/index.js";
const store = createStore({
  modules: {
    coaches: coaches,
    messages: messages,
    auth: auth,
  },
});

export default store;
