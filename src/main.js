import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
//import BaseBadge from "./components/UI/BaseBadge.vue";
//import BaseButton from "./components/UI/BaseButton.vue";
//import BaseCard from "./components/UI/BaseCard.vue";
//import BaseSpinner from "./components/UI/BaseSpinner.vue";
//import BaseDialog from "./components/UI/BaseDialog.vue";

let BaseDialog = defineAsyncComponent(() => import("./components/UI/BaseDialog.vue"));
let BaseBadge = defineAsyncComponent(() => import("./components/UI/BaseBadge.vue"));
let BaseButton = defineAsyncComponent(() => import("./components/UI/BaseButton.vue"));
let BaseCard = defineAsyncComponent(() => import("./components/UI/BaseCard.vue"));
let BaseSpinner = defineAsyncComponent(() => import("./components/UI/BaseSpinner.vue"));

library.add(fas);

const app = createApp(App);

app.use(store);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("base-badge", BaseBadge);
app.component("base-btn", BaseButton);
app.component("base-card", BaseCard);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);

app.mount("#app");
