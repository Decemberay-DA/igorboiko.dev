import type { GLTF } from "three/examples/jsm/Addons.js";
import { GE } from ".";
import { asi } from "../asi/asi";
import { CameraManager } from "../CameraManagiment/CameraManager";
import { TJ } from "../ThreeJS";
import { ThreeObjectFinderH } from "../ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import { ThreeSceneWasLoaded as ThreeSceneWasLoadedAndInited } from "../ThreeJS/LoadCurtains/Events/ThreeSceneWasLoaded";
import type { THREE } from "../ThreeJS/ThreeEngine/THREE";
import { VertexColoredMaterialH } from "../ThreeJS/VertexColoredMaterial/VertexColoredMaterialH";

/**
 * its goal is to ckick scene up.
 */
export default class SceneConfiguratorH {
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
		asi.data.ThreeSceneManagimented = bgScene;

		// add gltf stuff ========-====-====-====-============
		const gltfBG: GLTF = await TJ.GLTFLoaderH.aGetLoadedGLTF();
		asi.data.ThreeSceneGLTF = gltfBG;
		bgScene.scene.add(gltfBG.scene);

		// Camera managiment ========-====-====-====-============
		const mainCamera = bgScene.scene.getObjectByName(
			CameraManager.__MAIN_CAMERA__
		) as THREE.PerspectiveCamera;
		const cameraManager = new CameraManager(mainCamera);
		asi.data.CameraManager = cameraManager;

		// const mainCameraCrain = bgScene.scene.getObjectByName(
		// 	CameraCrain.__MAIN_CAMERA_CRANE__
		// ) as THREE.Object3D;
		// const cameraCrain = new CameraCrain(mainCameraCrain);
		// asi.data.CAMERA_CRAIN = cameraCrain;

		// const cameraScenes = CameraScenesExtractorH___.extract__();
		// asi.data.CAMERA_SCENES = cameraScenes;

		// create cursor ========-====-====-====-============
		// const cursorStranding = CursorStrandingBuilder.getPlatformDependend();
		// asi.data.Cursor = cursorStranding;

		// add test rotation to ========-====-====-====-============
		const ringRoot = bgScene.scene.getObjectByName("_RING_ROOT_grp") as THREE.Object3D;
		const ringRotator = new GE.AnemicDynamicObject({
			onFrameUpdate() {
				ringRoot.rotation.y = GE.GameTime.realTimeSinceStartup * 0.0034;
			},
		});
		// add test rotation to ========-====-====-====-============
		const planetSurface = bgScene.scene.getObjectByName("planetSurface") as THREE.Object3D;
		const planetSurfaceRotator = new GE.AnemicDynamicObject({
			onFrameUpdate() {
				planetSurface.rotation.y = GE.GameTime.realTimeSinceStartup * 0.0021;
			},
		});

		// add noised transform motion to stars ========-====-====-====-============
		const starClusters = ThreeObjectFinderH.byUserData(bgScene.scene, "ROLE", "STAR_CLUSTER");
		for (const cluster of starClusters) {
			const starClusterRotator = new GE.AnemicDynamicObject({
				onFrameUpdate() {
					cluster.rotation.y = GE.GameTime.realTimeSinceStartup * 0.0121;
				},
			});
			// const floater = new ObjectsTransformsNoiser(cluster);
			// floater.noiser.influencePosition = 0; // bug
			// floater.noiser.speedPosition = 0;
			// floater.noiser.influenceQuaternion = 0.0001;
			// floater.noiser.speedQuaternion = 0.2;
		}

		// apply vertex color material on everything ========-====-====-====-============
		const vertexColored = new TJ.VertexColoredMaterial();
		VertexColoredMaterialH.assignWhiteVertexColorsToSceneIfHasNoVC(bgScene.scene);
		asi.data.ThreeSceneManagimented.scene.overrideMaterial = vertexColored.shader;

		asi.mediator.publish(new ThreeSceneWasLoadedAndInited());
	}
}
