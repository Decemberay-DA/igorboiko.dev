import type { GLTF } from "three/examples/jsm/Addons.js";
import { GE } from ".";
import { asi } from "../asi/asi";
import { CameraCrain } from "../CameraManagiment/CameraCrain";
import { CameraManager } from "../CameraManagiment/CameraManager";
import { CameraScenesExtractor } from "../CameraManagiment/CameraScenes";
import { DU } from "../DevUnilities";
import { TJ } from "../ThreeJS";
import { THREE } from "../ThreeJS/THREE";
import { ObjectFinder } from "../ThreeJS/Helpers/ObjectFinder";
import { ObjectsTransformsNoiser } from "../DinamicObjects/ObjectsTransformsNoiser";

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
		const planet = bgScene.scene.getObjectByName("planetSurface_01") as THREE.Object3D;
		const planetRotator = new GE.AnemicDynamicObject({
			onFrameUpdate() {
				planet.rotation.y =
					planet.rotation.y + GE.GameTime.realTimeSinceStartup * 0.002 * GE.GameTime.deltaTime;
			},
		});

		// add noised transform motion to stars ========-====-====-====-============
		const starClusters = ObjectFinder.ByUserData(bgScene.scene, "ROLE", "STAR_CLUSTER");
		for (const cluster of starClusters) {
			const floater = new ObjectsTransformsNoiser(cluster);
			floater.noiser.influencePosition = 0; // bug
			floater.noiser.speedPosition = 0;
			floater.noiser.influenceQuaternion = 0.0001;
			floater.noiser.speedQuaternion = 0.2;
		}

		// apply vertex color material on everything ========-====-====-====-============
		const vertexColored = new TJ.VertexColoredMaterial();
		TJ.VertexColoredMaterial.assignWhiteVertexColorsToSceneIfHasNoVC(bgScene.scene);
		asi.data.THREE_MANAGIMENTED_SCENE.scene.overrideMaterial = vertexColored.shader;

		DU.Logger.write("Scene was builded");
	}
}
