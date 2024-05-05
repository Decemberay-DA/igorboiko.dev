import type { GLTF } from "three/examples/jsm/Addons.js";
import NSceneConfigurationChanged from "../../CameraManagiment/DefinedScenes/Events/SceneConfigurationWasChanged";
import { TJ, THREE, VertexColoredMaterialH } from "../../ThreeJS";
import { TAnyInterractionListenerB } from "../../MegaCursor/MouseClicking/TAnyInterractionListenerB";
import { pipe, type LazyArg } from "fp-ts/lib/function";
import { array } from "fp-ts";
import { IDinamicUpdateB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdateB";
import { IDinamicObjectB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/builders";
import type { IDinamicUpdate } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdate";
import { IDinamicUpdatesH } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdatesH";
import { IDB } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/IDB";
import { ThreeObjectFinderH } from "@/scripts/ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import { IURIB } from "@/scripts/GameEngineFunctional/ADTs/_IURI/IURIB";
import { CurrentSceneFromDOMDetectorB } from "@/scripts/VueTSHelpers/CurrentSceneFromDOMDetectorB";
import asi from "../../asi/asi";

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
		// listener game setup ========-====-====-====-============
		// some listeners that are convertinc any type of events to mediated notifications
		const anyListener = TAnyInterractionListenerB.new(asi.game.root.self);
		const CurrentSceneFromDOMDetector = CurrentSceneFromDOMDetectorB.new();

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
					IDinamicUpdatesH.newInsertedAndParentedToasiRootGame,
					IURIB.newImprinted("CubeRotator"),
					IDB.new
				)
			)
		);
		
//end

		// apply vertex color material on everything ========-====-====-====-============
		const vertexColored = new TJ.VertexColoredMaterial();
		await VertexColoredMaterialH.assignWhiteVertexColorsToSceneIfHasNoVC(asi.data.ThreeScene);
		asi.data.ThreeSceneManagimented.scene.overrideMaterial = vertexColored.shader;

		// asi.mediator.publish(new ThreeSceneWasLoadedAndInited());
		asi.mediator.publish(new NSceneConfigurationChanged());
	}
}
