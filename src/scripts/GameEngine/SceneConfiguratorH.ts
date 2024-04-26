import type { GLTF } from "three/examples/jsm/Addons.js";
import { GE } from ".";
import asi from "../asi/asi";
import CameraManager from "../CameraManagiment/CameraManager";
import NSceneConfigurationChanged from "../CameraManagiment/DefinedScenes/Events/SceneConfigurationWasChanged";
import { TJ, THREE, VertexColoredMaterialH } from "../ThreeJS";
import { ThreeObjectFinderH } from "../ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import TAnyInterractionListener from "../MegaCursor/MouseClicking/TAnyInterractionListener";
import { pipe } from "fp-ts/lib/function";
import { array } from "fp-ts";
import randomH from "../utils/randomH";
import { math } from "../utils";

/**
 * its goal is to buld scene up.
 */
export default class SceneConfiguratorH {
	/**
	 * Here i am setting up scene.
	 * like adding main stuff in to it.
	 * like in unity lol.
	 */
	public static async asetupMainScenePage() {
		// Base Game setup ========-====-====-====-============
		const timeUpdater = new GE.GameTime(); // just init and add to Game update cycle
		const listenerA = new TAnyInterractionListener();

		// Three background scene ========-====-====-====-============
		const bgScene = new TJ.ThreeScene();
		TJ.ThreeScenesManager.BACKGROUND_SCENE.InitSetThreeScene(bgScene);
		asi.data.ThreeSceneManagimented = bgScene;

		// add gltf stuff ========-====-====-====-============
		const gltfBG: GLTF = await TJ.GLTFLoaderH.aGetLoadedGLTF((perc) =>
			console.log("GLTF load percentage: " + perc)
		);
		asi.data.ThreeSceneGLTF = gltfBG;
		bgScene.scene.add(gltfBG.scene);

		// Camera managiment ========-====-====-====-============
		const mainCamera = bgScene.scene.getObjectByName(
			CameraManager.__MAIN_CAMERA__
		) as THREE.PerspectiveCamera;
		const cameraManager = new CameraManager(mainCamera);
		asi.data.CameraManager = cameraManager;
		asi.data.ThreeSceneManagimented.setCamera(mainCamera);

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
		const rotatorses = pipe(
			starClusters,
			array.map(
				(sc) =>
					new GE.AnemicDynamicObject({
						onFrameUpdate() {
							sc.rotation.y =
								GE.GameTime.realTimeSinceStartup *
								math.lerp(0.0121, 0.0321, randomH.float0to1());
						},
					})
			)
		);

		// apply vertex color material on everything ========-====-====-====-============
		const vertexColored = new TJ.VertexColoredMaterial();
		await VertexColoredMaterialH.assignWhiteVertexColorsToSceneIfHasNoVC(bgScene.scene);
		asi.data.ThreeSceneManagimented.scene.overrideMaterial = vertexColored.shader;

		// asi.mediator.publish(new ThreeSceneWasLoadedAndInited());
		asi.mediator.publish(new NSceneConfigurationChanged());
	}
}
