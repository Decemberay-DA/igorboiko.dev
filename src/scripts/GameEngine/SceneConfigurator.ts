import * as DO from "../DinamicObjects/index";
import * as MC from "../MegaCursor/index";
import * as DU from "../DevUnilities/index";
import * as TJ from "../ThreeJS/index";
import { GE } from ".";
import { BackgroundMaterial } from "../ThreeJS/BackgroundShader/BackgroundMaterial";
import * as THREE from "three";

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
		const timeUpdater = new GE.GameTime(); // just init and add to Game update cycle

		// all elements woth this style is float
		DO.FloatingElementsFactory.registerFloatingObjectsForClass("pv-js-live-floating-subject");

		// Three scene background ========-====-====-====-============
		const bgScene = new TJ.ThreeScene();
		TJ.ThreeScenesManager.BACKGROUND_SCENE.InitSetThreeScene(bgScene);

		const bgGeometryPlane = new THREE.PlaneGeometry(16, 16);
		const bgMaterial = new TJ.BackgroundMaterial();
		const bgMesh = new THREE.Mesh(bgGeometryPlane, bgMaterial.shader);
		bgMesh.position.z = -3;
		bgScene.scene.add(bgMesh);
		bgScene.camera.position.z = 1;

		// Three cursor ========-====-====-====-============
		const cursorStranding = null;
		const cursorDetector = null;
		const cursorPositionProvider = null;
		const cursor = new MC.MegaCursor();
		const betrayal = new MC.CursorBetrayal();

		DU.Logger.write("Scene was builded");
	}
}
