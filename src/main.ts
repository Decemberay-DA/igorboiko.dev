import "./assets/styles/styles.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import * as GE from "./scripts/GameEngine/index";

const app = createApp(App);
app.mount("#app");

// start all game scripts
// without them its pure html
const sc = new GE.SceneConfigurator();
sc.setupMainScenePage();
const gm = GE.GameManager.getInstance();
gm.start();
