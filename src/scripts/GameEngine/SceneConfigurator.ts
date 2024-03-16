import * as DO from "../DinamicObjects/index";
import * as MC from "../MegaCursor/index";
import * as DU from "../DevUnilities/index";
import * as TJ from "../ThreeJS/index";
import { GE } from ".";
import { BackgroundMaterial } from "../ThreeJS/BackgroundShader/BackgroundMaterial";

/**
 * its goal is to ckick scene up.
 */
export class SceneConfigurator {
	public constructor() {}

	/**
	 * Here i am setting up scene.
	 * like adding main stuff in to it.
	 * like in unity lol.
	 */
	public start() {
		const timeUpdater = new GE.GameTime();

		// all elements woth this style is float
		DO.FloatingElementsFactory.registerFloatingObjectsForClass("pv-js-live-floating-subject");

		const threeBackground = new TJ.ThreeScene();
		TJ.ThreeScenesManager.BACKGROUND_SCENE.InitSetThreeScene(threeBackground);

		const bgMat = new BackgroundMaterial();

		const cursorStranding = null;
		const cursorDetector = null;
		const cursorPositionProvider = null;
		const cursor = new MC.MegaCursor();
		const betrayal = new MC.CursorBetrayal();

		DU.Logger.write("Scene was builded");
	}
}
