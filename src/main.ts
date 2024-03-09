import "./assets/styles/styles.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import * as GE from "./scripts/GameEngine/index";

createApp(App).mount("#app");

const sc = new GE.SceneConfigurator();
sc.start();
GE.GameManager.getInstance().start();
