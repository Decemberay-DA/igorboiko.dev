import type { GLTF } from "three/examples/jsm/Addons.js";
import { GE } from ".";
import { asi } from "../asi/asi";
import { CameraCrain } from "../CameraManagiment/CameraCrain";
import { CameraManager } from "../CameraManagiment/CameraManager";
import { CameraScenesExtractor } from "../CameraManagiment/CameraScenes";
import { DU } from "../DevUnilities";
import { TJ } from "../ThreeJS";
import { THREE } from "../ThreeJS/THREE";

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

		// Three background scene ========-====-====-====-============
		const bgScene = new TJ.ThreeScene();
		TJ.ThreeScenesManager.BACKGROUND_SCENE.InitSetThreeScene(bgScene);
		asi.data.THREE_MANAGIMENTED_SCENE = bgScene;

		// add gltf stuff ========-====-====-====-============
		const gltfBG: GLTF = await TJ.GLTFLoaderchik.aGelLoadedGLTF();
		asi.data.GLTF_THREE_SCENE = gltfBG;
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

		// create cursor ========-====-====-====-============
		// const cursorStranding = CursorStrandingBuilder.getPlatformDependend();
		// asi.data.Cursor = cursorStranding;

		// add test rotation to planet ========-====-====-====-============
		const planet = bgScene.scene.getObjectByName("Globa") as THREE.Object3D;
		const innerplanet = bgScene.scene.getObjectByName("Sphere") as THREE.Object3D;
		const planetRotator = new GE.AnemicDynamicObject({
			onStart() {},
			onFrameUpdate() {
				planet.rotation.y =
					planet.rotation.y + GE.GameTime.realTimeSinceStartup * 0.002 * GE.GameTime.deltaTime;
				innerplanet.rotation.y =
					innerplanet.rotation.y +
					GE.GameTime.realTimeSinceStartup * -0.003 * GE.GameTime.deltaTime;
			},
		});

		// create a test bg plane ========-====-====-====-============
		const bgGeometryPlane = new THREE.PlaneGeometry(6, 6);
		const bgMaterial = new TJ.BackgroundMaterial();
		const bgMesh = new THREE.Mesh(bgGeometryPlane, bgMaterial.shader);
		bgMesh.position.z = -3;
		bgScene.scene.add(bgMesh);
		bgScene.camera.position.z = 1;

		// test assing fractals to planet
		(planet as THREE.Mesh).material = bgMaterial.shader;

		DU.Logger.write("Scene was builded");
	}
}
