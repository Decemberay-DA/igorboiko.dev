import { asi } from "@/scripts/asi/asi";
import type { IHTMLScene, IScene, ITHREEScene, TAnyScene } from "./IScene";

/**
 * doing stuff
 */
export default class ISceneEX {
	public static tweenTo(scene: TAnyScene) {
		if ("htmlElement" in scene) {
			ISceneEX.tweenToHtmlScene(scene);
		} else if ("camera" in scene) {
			ISceneEX.tweenToThreeScene(scene);
		} else {
			ISceneEX.tweenToScene(scene);
		}
	}

	public static tweenToScene(scene: IScene) {
		ISceneEX.tweenToHtmlScene(scene);
		ISceneEX.tweenToThreeScene(scene);
	}
	public static tweenToHtmlScene(threeScene: IHTMLScene) {
		// launch html page scroll tween
	}
	public static tweenToThreeScene(threeScene: ITHREEScene) {
		// launch camera transforms tween
		asi.data.CameraManager.tweenTo(threeScene.camera, 2);
		// launch camera params tween
		// launch crane transforms tween
		// launch postprocess params tween
	}
}
