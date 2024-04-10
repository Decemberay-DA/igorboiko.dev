import * as DO from "../DinamicObjects/index";
import * as DU from "../DevUnilities/index";
import * as TJ from "../ThreeJS/index";
import { GE } from ".";
import * as THREE from "three";
import { type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEENUpdater } from "../DinamicObjects/TWEENUpdater";
import { CameraManager } from "../CameraManagiment/CameraManager";
import asi from "../asi/asi";
import { CameraCrain } from "../CameraManagiment/CameraCrain";
import { CameraScenes, CameraScenesExtractor } from "../CameraManagiment/CameraScenes";

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
	public async setupMainScenePage() {
		// Base Game setup ========-====-====-====-============
		const timeUpdater = new GE.GameTime(); // just init and add to Game update cycle
		const tweenUpdater = new TWEENUpdater();

		// Three background scene ========-====-====-====-============
		const bgScene = new TJ.ThreeScene();
		TJ.ThreeScenesManager.BACKGROUND_SCENE.InitSetThreeScene(bgScene);

		// add gltf stuff ========-====-====-====-============
		const gltfBG: GLTF = await TJ.GLTFLoaderchik.aGelLoadedGLTF();
		bgScene.scene.add(gltfBG.scene);

		// Camera managiment ========-====-====-====-============
		const mainCameraRef = bgScene.scene.getObjectByName(
			CameraManager.__MAIN_CAMERA__
		) as THREE.PerspectiveCamera;
		const cameraManager = new CameraManager(mainCameraRef);
		asi.data.CAMERA_MANAGER = cameraManager;

		const mainCameraCrainRef = bgScene.scene.getObjectByName(
			CameraCrain.__MAIN_CAMERA_CRANE__
		) as THREE.Object3D;
		const cameraCrain = new CameraCrain(mainCameraCrainRef);
		asi.data.CAMERA_CRAIN = cameraCrain;

		const cameraScenes = CameraScenesExtractor.extract();
		asi.data.CAMERA_SCENES = cameraScenes;

		let currentCameraIndex = 0;
		async function setNextCameraAsActive() {
			currentCameraIndex++;
			if (currentCameraIndex > gltfBG.cameras.length - 1) {
				currentCameraIndex = 0;
			}
			const randomCameraIndex = Math.floor(currentCameraIndex);
			const nextCamera = gltfBG.cameras[randomCameraIndex] as THREE.PerspectiveCamera; // here may be a bug due to cast
			console.warn("Next camera name is: " + nextCamera.name);
			console.warn("Current active camera is: " + bgScene.camera.name);

			asi.data.CAMERA_MANAGER.tweenTo(nextCamera); // move active camera to position of next camera
		}
		const keydownListener = (event: KeyboardEvent) => {
			if (event.key === "f") setNextCameraAsActive();
		};
		const setRandomCameraAsActiveController = new DO.AnonimousDynamicObject({
			onStart: () => window.addEventListener("keydown", keydownListener),
			onDelete: () => window.removeEventListener("keydown", keydownListener),
		});

		// add test rotation to planet ========-====-====-====-============
		const planet = bgScene.scene.getObjectByName("Globa") as THREE.Object3D;
		const innerplanet = bgScene.scene.getObjectByName("Sphere") as THREE.Object3D;
		const planetRotator = new DO.AnonimousDynamicObject({
			onFrameUpdate: () => {
				planet.rotation.y = planet.rotation.y + GE.GameTime.realTimeSinceStartup * 0.0002;
				innerplanet.rotation.y = innerplanet.rotation.y + GE.GameTime.realTimeSinceStartup * 0.0003;
			},
		});

		// create a test bg plane ========-====-====-====-============
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

		DU.Logger.write("Scene was builded");
	}
}
