import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { loadFonts } from "./plugins/webfontloader";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase";

loadFonts();

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(vuetify);
app.use(autoAnimatePlugin);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.mount("#app");
