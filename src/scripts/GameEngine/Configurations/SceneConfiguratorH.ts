import type { GLTF } from "three/examples/jsm/Addons.js";
import { GE } from "..";
import asi from "../../asi/asi";
import CameraManager from "../../CameraManagiment/CameraManager";
import NSceneConfigurationChanged from "../../CameraManagiment/DefinedScenes/Events/SceneConfigurationWasChanged";
import { TJ, THREE, VertexColoredMaterialH } from "../../ThreeJS";
import { ThreeObjectFinderH } from "../../ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import TAnyInterractionListener from "../../MegaCursor/MouseClicking/TAnyInterractionListener";
import { pipe, type LazyArg } from "fp-ts/lib/function";
import { array } from "fp-ts";
import randomH from "../../utils/randomH";
import { mathH } from "../../utils";
import { ConfigurationH } from "./ConfigurationH";
import { FPSPilotB } from "@/scripts/CameraManagiment/FPSPilotB";
import { BridgeH } from "../_bridge/Bridge";

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
		ConfigurationH.time();
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
		// const cameraManager = new CameraManager(mainCamera);
		// // asi.data.CameraManager = cameraManager;
		asi.data.ThreeSceneManagimented.setCamera(mainCamera);

		const cameraPilot = FPSPilotB.new(mainCamera);
		GE.Game.getInstance().registerDinamicObject(cameraPilot);

		// const mainCameraCrain = bgScene.scene.getObjectByName(
		// 	CameraCrain.__MAIN_CAMERA_CRANE__
		// ) as THREE.Object3D;
		// const cameraCrain = new CameraCrain(mainCameraCrain);
		// asi.data.CAMERA_CRAIN = cameraCrain;

		// const cameraScenes = CameraScenesExtractorH___.extract__();
		// asi.data.CAMERA_SCENES = cameraScenes;

		// const newTimeBasedRotator =
		// 	(axis: "x" | "y" | "z") =>
		// 	(speed: LazyArg<number>) =>
		// 	(time: LazyArg<number>) =>
		// 	(obj: THREE.Object3D): GE.ADynamicObject => {
		// 		return new GE.AnemicDynamicObject({
		// 			onFrameUpdate() {
		// 				obj.rotation[axis] = time() * speed();
		// 			},
		// 		});
		// 	};

		// // add test rotation to ========-====-====-====-============
		// const ringRoot = bgScene.scene.getObjectByName("_RING_ROOT_grp") as THREE.Object3D;
		// const ringRotator = newTimeBasedRotator("y")(() => 0.0034)(() => GE.GameTime.realTimeSinceStartup)(
		// 	ringRoot
		// );

		// // add test rotation to ========-====-====-====-============
		// const planetSurface = bgScene.scene.getObjectByName("planetSurface") as THREE.Object3D;
		// const planetSurfaceRotator = newTimeBasedRotator("y")(() => 0.0021)(
		// 	() => GE.GameTime.realTimeSinceStartup
		// )(ringRoot);

		// // add noised transform motion to stars ========-====-====-====-============
		// const starClusters = ThreeObjectFinderH.byUserData(bgScene.scene, "ROLE", "STAR_CLUSTER");
		// const rotatorses = pipe(
		// 	starClusters,
		// 	array.mapWithIndex((index, starCluster) =>
		// 		newTimeBasedRotator("y")(() => math.lerp(0.0121, 0.0321, randomH.float0to1(index)))(
		// 			() => GE.GameTime.realTimeSinceStartup
		// 		)(starCluster)
		// 	)
		// );

		// // add star flickerage
		// const stars = pipe(
		// 	starClusters,
		// 	array.map((cluster) => ThreeObjectFinderH.byUserData(cluster, "ROLE", "CLUSTERED_STAR")),
		// 	array.flatten
		// );

		// apply vertex color material on everything ========-====-====-====-============
		const vertexColored = new TJ.VertexColoredMaterial();
		await VertexColoredMaterialH.assignWhiteVertexColorsToSceneIfHasNoVC(bgScene.scene);
		asi.data.ThreeSceneManagimented.scene.overrideMaterial = vertexColored.shader;
		// asi.data.ThreeSceneManagimented.scene.overrideMaterial = new THREE.MeshBasicMaterial({
		// 	color: 0x00ff00,
		// });

		// asi.mediator.publish(new ThreeSceneWasLoadedAndInited());
		asi.mediator.publish(new NSceneConfigurationChanged());
	}
}
