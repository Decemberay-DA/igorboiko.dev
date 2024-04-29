import type { GLTF } from "three/examples/jsm/Addons.js";
import asi from "../../asi/asi";
import NSceneConfigurationChanged from "../../CameraManagiment/DefinedScenes/Events/SceneConfigurationWasChanged";
import { TJ, THREE, VertexColoredMaterialH } from "../../ThreeJS";
import TAnyInterractionListener from "../../MegaCursor/MouseClicking/TAnyInterractionListener";
import { ConfigurationH } from "./ConfigurationH";
import { pipe, type LazyArg } from "fp-ts/lib/function";
import { array } from "fp-ts";
import { mathH } from "@/scripts/utils/mathH";
import randomH from "@/scripts/utils/randomH";
import { IDinamicUpdatesB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdates/IDinamicUpdatesB";
import { IDinamicUpdateB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdate/IDinamicUpdateB";
import { IDinamicObjectB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectB";
import { IEnableableB } from "@/scripts/GameEngineFunctional/ADTs/IEnableable/IEnableableB";
import type { IDinamicUpdate } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdate/IDinamicUpdate";
import { IDinamicUpdatesH } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdates/IDinamicUpdatesH";
import { PromisseH } from "@/scripts/utils/PromisseH";
import { ILoopB } from "@/scripts/GameEngineFunctional/ADTs/ILoop/ILoop";
import { IDB } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/IDB";
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
		// const gltfBG: GLTF = await TJ.GLTFLoaderH.aGetLoadedGLTF((perc) =>
		// 	console.log("GLTF load percentage: " + perc)
		// );
		const gltfBG: GLTF = await TJ.GLTFLoaderH.aGetLoadedGLTF(
			(perc) => console.log("GLTF load percentage: " + perc),
			"/public/models/testFunctional.gltf"
		);
		asi.data.ThreeSceneGLTF = gltfBG;
		bgScene.scene.add(gltfBG.scene);

		// Camera managiment ========-====-====-====-============
		const mainCamera = bgScene.scene.getObjectByName("___TheCamera___") as THREE.PerspectiveCamera;
		asi.data.ThreeSceneManagimented.setCamera(mainCamera);

		// const cameraPilot = FPSPilotB.new(mainCamera);
		// GE.Game.getInstance().registerDinamicObject(cameraPilot);

		const newTimeBasedRotator =
			(axis: "x" | "y" | "z") =>
			(speed: LazyArg<number>) =>
			(time: LazyArg<number>) =>
			(obj: THREE.Object3D): IDinamicUpdate =>
				IDinamicUpdateB.new({
					onFrameUpdate() {
						obj.rotation[axis] = time() * speed();
					},
				});

		// let iskill = false;
		// let isDoLoop = true;
		// const loop = ILoopB.newLoopBehaviour(() => iskill)(() => isDoLoop)(() => {
		// 	console.warn("hgiarukjd------");
		// });
		// loop();

		// PromisseH.runSimultaneously([
		// 	new Promise<void>((resolve) =>
		// 		setTimeout(() => {
		// 			isDoLoop = false;
		// 			console.log("loop disabled after 5500 ms");
		// 			resolve();
		// 		}, 5500)
		// 	),
		// 	new Promise<void>((resolve) =>
		// 		setTimeout(() => {
		// 			isDoLoop = true;
		// 			console.log("loop reenabled after 8000 ms");
		// 			resolve();
		// 		}, 8000)
		// 	),
		// ]);

		// new collection
		const rootGameLooppingParticipants = IDinamicUpdatesB.new({
			onStart(time) {
				console.warn("started time: " + time.frame + " " + time.delta);
			},
			onFrameUpdate(time) {
				console.warn("frame updated on root object time: " + time.frame + " " + time.delta);
			},
		});
		const rootGameLoopping = IDinamicObjectB.newRoot(rootGameLooppingParticipants);
		const rootGame = IDB.new(rootGameLoopping);

		// const cubeRotators = pipe(
		// 	asi.data.ThreeScene.children,
		// 	array.filter((obj) => obj.name.includes("TheCube")),
		// 	// rotation for each cube
		// 	array.mapWithIndex((i, cube) =>
		// 		newTimeBasedRotator("x")(() =>
		// 			pipe(
		// 				randomH.float0to1(i * 8452), //
		// 				mathH.lerpc(-90)(90)
		// 			)
		// 		)(() => performance.now())(cube)
		// 	),
		// 	// register in root collection
		// 	array.map((obj) => IDinamicUpdatesH.insertAndSort(obj)(collectionUpdateability))
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
