import "./assets/styles/styles.min.css";
import "./styles/global.scss";
import { createApp } from "vue";
import App from "./App.vue";
import * as GE from "./scripts/GameEngine";
import SceneConfiguratorH from "./scripts/GameEngine/SceneConfiguratorH";
import TailwindToCSSImprinterH from "./scripts/styles/TailwindToCSSImprinterH";

createApp(App).mount("#app");

// start all game scripts
// without them its pure DEATH html

// init utils
TailwindToCSSImprinterH.injectTailwindVariablesToDocument();

// setup asi
// ni

// init game
await SceneConfiguratorH.asetupMainScenePage();
GE.Game.getInstance().triggerStart();
