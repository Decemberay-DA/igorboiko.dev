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
import {
	IDinamicObjectB,
	type IRootGame,
} from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectB";
import { IEnableableB } from "@/scripts/GameEngineFunctional/ADTs/IEnableable/IEnableableB";
import type { IDinamicUpdate } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdate/IDinamicUpdate";
import { IDinamicUpdatesH } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdates/IDinamicUpdatesH";
import { PromisseH } from "@/scripts/utils/PromisseH";
import { ILoopB } from "@/scripts/GameEngineFunctional/ADTs/ILoop/ILoop";
import { IDB } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/IDB";
import { ThreeObjectFinderH } from "@/scripts/ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import { MATHJS } from "@/scripts/FrameworksExport";
import type { IDinamicObject } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObject";
import type { ID } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/ID";
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

		const rootGame = pipe(
			{
				onStart(time) {
					console.log("Root game started");
				},
			},
			IDinamicUpdatesB.new,
			IDinamicObjectB.newRoot,
			IDB.new
		);

		const newTimeBasedRotator =
			(axis: "x" | "y" | "z") =>
			(speed: LazyArg<number>) =>
			(obj: THREE.Object3D): IDinamicUpdate =>
				IDinamicUpdateB.new({
					onFrameUpdate(time) {
						obj.rotation[axis] = time.sinceStart * speed();
					},
				});

		const cubeRotators = pipe(
			asi.data.ThreeScene,
			ThreeObjectFinderH.byIncludedName("TheCube"),
			array.map((cube) =>
				pipe(
					cube,
					newTimeBasedRotator("y")(() => 0.0003375),
					IDinamicObjectB.newFromIDinamicUpdate,
					IDinamicUpdatesH.newInsertedAndBinded(rootGame.self),
					IDB.new
				)
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
