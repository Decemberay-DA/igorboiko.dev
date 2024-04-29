import type { GLTF } from "three/examples/jsm/Addons.js";
import asi from "../../asi/asi";
import NSceneConfigurationChanged from "../../CameraManagiment/DefinedScenes/Events/SceneConfigurationWasChanged";
import { TJ, THREE, VertexColoredMaterialH } from "../../ThreeJS";
import { TAnyInterractionListenerB } from "../../MegaCursor/MouseClicking/TAnyInterractionListener";
import { pipe, type LazyArg } from "fp-ts/lib/function";
import { array } from "fp-ts";
import { IDinamicUpdateB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdateB";
import { IDinamicObjectB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectB";
import type { IDinamicUpdate } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdate";
import { IDinamicUpdatesH } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdatesH";
import { IDB } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/IDB";
import { ThreeObjectFinderH } from "@/scripts/ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import { BroH } from "@/scripts/GameEngineFunctional/FunctionalBroH";
import { GameB } from "@/scripts/GameEngineFunctional/Types/GameB";

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
		// ConfigurationH.time(); // obsolete
		// const listenerA = new TAnyInterractionListener();
		const listenerGame = GameB.listenerGame();
		const anyListener = TAnyInterractionListenerB.new(listenerGame.self);

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

		const rootGame = GameB.rootGame();

		const newTimeBasedRotation =
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
					newTimeBasedRotation("y")(() => 0.0003375),
					IDinamicObjectB.new,
					IDinamicUpdatesH.newInsertedAndParented(rootGame.self),
					IDB.new,
					BroH.logThisOnePLZ
					// BroH.meanwhile((id) => console.log(id))
				)
			)
		);

		// apply vertex color material on everything ========-====-====-====-============
		const vertexColored = new TJ.VertexColoredMaterial();
		await VertexColoredMaterialH.assignWhiteVertexColorsToSceneIfHasNoVC(asi.data.ThreeScene);
		asi.data.ThreeSceneManagimented.scene.overrideMaterial = vertexColored.shader;

		// asi.mediator.publish(new ThreeSceneWasLoadedAndInited());
		asi.mediator.publish(new NSceneConfigurationChanged());
	}
}
