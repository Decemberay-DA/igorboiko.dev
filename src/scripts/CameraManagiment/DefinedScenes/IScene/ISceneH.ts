import asi from "@/scripts/asi/asi";
import type { IHTMLScene, IScene, ITHREEScene, TAnyScene } from "./IScene";

/**
 * doing stuff
 */
export default class ISceneH {
	static readonly tweenTo = (scene: TAnyScene): TAnyScene => {
		if ("htmlElement" in scene) {
			ISceneH.tweenToHtmlScene(scene);
		} else if ("camera" in scene) {
			ISceneH.tweenToThreeScene(scene);
		} else {
			ISceneH.tweenToScene(scene);
		}
		return scene;
	};

	public static tweenToScene(scene: IScene) {
		ISceneH.tweenToHtmlScene(scene);
		ISceneH.tweenToThreeScene(scene);
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
