import * as DO from "../DinamicObjects/index";
import * as MC from "../MegaCursor/index";
import * as DU from "../DevUnilities/index";
import * as TJ from "../ThreeJS/index";
import { GE } from ".";
import * as THREE from "three";
import { type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

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
	public async start() {
		// Base Game setup ========-====-====-====-============
		const timeUpdater = new GE.GameTime(); // just init and add to Game update cycle
		// GE.Game.getInstance().disable(); // test disable game to just create a website and not be bored by all the code

		// all elements woth this style is float
		DO.FloatingElementsFactory.registerFloatingObjectsForClass("pv-js-live-floating-subject");

		// Three background scene ========-====-====-====-============
		const bgScene = new TJ.ThreeScene();
		TJ.ThreeScenesManager.BACKGROUND_SCENE.InitSetThreeScene(bgScene);
		// add gltf stuff
		const gltfBG: GLTF = await TJ.GLTFLoaderchik.aGelLoadedGLTF();
		bgScene.scene.add(gltfBG.scene);
		// set random camera every time scene loaded for test
		let currentCameraIndex = 0;
		async function setNextCameraAsActive() {
			currentCameraIndex++;
			if (currentCameraIndex > gltfBG.cameras.length) {
				currentCameraIndex = 0;
			}
			const randomCameraIndex = Math.floor(currentCameraIndex);
			const activeCamera = gltfBG.cameras[randomCameraIndex] as THREE.PerspectiveCamera; // here may be a bug due to cast
			activeCamera.updateProjectionMatrix();
			bgScene.setCamera(activeCamera);
		}
		const keydownListener = (event: KeyboardEvent) => {
			if (event.key === "f") setNextCameraAsActive();
		};
		const setRandomCameraAsActiveController = new DO.AnonimousDynamicObject({
			onStart: () => window.addEventListener("keydown", keydownListener),
			onDelete: () => window.removeEventListener("keydown", keydownListener),
		});

		// add test rotation to planet
		const planet = bgScene.scene.getObjectByName("Globa") as THREE.Object3D;
		const innerplanet = bgScene.scene.getObjectByName("Sphere") as THREE.Object3D;
		const planetRotator = new DO.AnonimousDynamicObject({
			onFrameUpdate: () => {
				planet.rotation.y = planet.rotation.y + GE.GameTime.realTimeSinceStartup * 0.0002;
				innerplanet.rotation.y = innerplanet.rotation.y + GE.GameTime.realTimeSinceStartup * 0.0003;
			},
		});

		// create a test bg plane
		const bgGeometryPlane = new THREE.PlaneGeometry(6, 6);
		const bgMaterial = new TJ.BackgroundMaterial();
		const bgMesh = new THREE.Mesh(bgGeometryPlane, bgMaterial.shader);
		bgMesh.position.z = -3;
		bgScene.scene.add(bgMesh);
		bgScene.camera.position.z = 1;

		// bgScene.disable(); // temporal
		// test assing fractals to planet
		(planet as THREE.Mesh).material = bgMaterial.shader;

		// Three foreground scene cursor ========-====-====-====-============
		const cursorStranding = null;
		const cursorDetector = null;
		const cursorPositionProvider = null;
		const cursor = new MC.MegaCursor();
		const betrayal = new MC.CursorBetrayal();

		DU.Logger.write("Scene was builded");
	}
}
