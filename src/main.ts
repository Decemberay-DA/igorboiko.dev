import "./assets/styles/styles.min.css";
import "./styles/global.scss";
import { createApp } from "vue";
import App from "./App.vue";
import * as GE from "./scripts/GameEngine";
import SceneConfiguratorH from "./scripts/GameEngine/SceneConfiguratorH";
import TailwindMirrorH from "./scripts/styles/TailwindMirrorH";

createApp(App).mount("#app");

// start all game scripts
// without them its pure DEATH html

// init utils
// TailwindToCSSImprinterH.injectTailwindVariablesToDocument();
TailwindMirrorH.injectColorTokensToCSSDocument();

// setup asi
// ni

// init game
await SceneConfiguratorH.asetupMainScenePage();
GE.Game.getInstance().triggerStart();
