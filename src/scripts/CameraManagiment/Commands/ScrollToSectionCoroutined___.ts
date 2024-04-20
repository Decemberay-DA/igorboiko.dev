import { asi } from "@/scripts/asi/asi";
import { GE } from "@/scripts/GameEngine";
import { SmoothLerper } from "../Lerper";

/**
 * @deprecated SceneTweenInitiator
 */
export class ScrollToSectionCoroutined {
	private static _instance: ScrollToSectionCoroutined;
	public static get instance(): ScrollToSectionCoroutined {
		if (!ScrollToSectionCoroutined._instance) {
			ScrollToSectionCoroutined._instance = new ScrollToSectionCoroutined();
		}
		return ScrollToSectionCoroutined._instance;
	}

	private constructor() {}

	private _coroutine!: GE.Coroutine;
	public launchTransitionCoroutine(sectionName: string, tweenTime = 0.5) {
		const startCameraScene = asi.data.CAMERA_SCENES.currentScene;
		const startSection = asi.data.DefinedSections.findSectionByName(startCameraScene.name);
		const endSection = asi.data.DefinedSections.findSectionByName(sectionName);

		const startScrollposition = startSection.htmlElement.getBoundingClientRect().top + window.scrollY;
		const endScrollposition = endSection.htmlElement.getBoundingClientRect().top + window.scrollY;

		// kill other coroutine of there are one
		if (this._coroutine && this._coroutine.isRunning) this._coroutine.kill();

		const startTime = GE.GameTime.realTimeSinceStartup;
		let factor = 0;
		let topOffset = startScrollposition;
		this._coroutine = new GE.Coroutine({
			stopOn: () => factor >= 1,
			onStart() {
				asi.context.isAbleCursorSectionSwitching = false;
			},
			onUpdate: () => {
				factor = GE.Coroutine.calculateRemainingFactor(startTime, tweenTime);
				topOffset = SmoothLerper.instance.Number(startScrollposition, endScrollposition, factor);
				window.scrollTo({ top: topOffset, behavior: "instant" });
			},
			onDelete: () => {
				topOffset = endScrollposition;
				window.scrollTo({ top: topOffset, behavior: "instant" });
				asi.context.isAbleCursorSectionSwitching = true;
			},
		});
		this._coroutine.launch();
	}
}
