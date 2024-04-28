import "./assets/styles/styles.min.css";
import "./styles/global.scss";
import { createApp } from "vue";
import App from "./App.vue";
import * as GE from "./scripts/GameEngine";
import SceneConfiguratorH from "./scripts/GameEngine/Configurations/SceneConfiguratorH";
import TailwindMirrorH from "./scripts/styles/TailwindMirrorH";
//
import { pipe } from "fp-ts/lib/function";
import { array } from "fp-ts";

// load website first
createApp(App).mount("#app");

/**
 * @deprecated
 */
const newTestMessageAfter =
	(dur_ms: number) =>
	(text: string): Promise<void> => {
		return new Promise<void>((resolve) =>
			setTimeout(() => {
				console.log(text);
				resolve();
			}, dur_ms)
		);
	};

// init all code in "parallel"
pipe(
	// some independed tasks on load
	[
		async () => await TailwindMirrorH.injectColorTokensToCSSDocument(),
		async () =>
			await SceneConfiguratorH.asetupMainScenePage().finally(() =>
				GE.Game.getInstance().triggerStart()
			),
		async () => await newTestMessageAfter(0)("nut after 0 ms"),
		async () => await newTestMessageAfter(1000)("nut after 1000 ms"),
		async () => await newTestMessageAfter(2000)("nut after 2000 ms"),
		async () => await newTestMessageAfter(3000)("nut after 3000 ms"),
		async () => await newTestMessageAfter(4000)("nut after 4000 ms"),
		async () => await newTestMessageAfter(5000)("nut after 5000 ms"),
	],
	// independent execution
	array.map((pro) => pro().then().catch())
);
