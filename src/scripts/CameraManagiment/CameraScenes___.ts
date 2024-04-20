import * as THREE from "three";
import { asi } from "../asi/asi";
import { ThreeObjectFinderH } from "../ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import EGLTF_PARAMS from "../ThreeJS/GLTFPipline/Enums/EGLTF_PARAMS";
import type { IEnumClass } from "../utils/AEnumClass";
import * as TWEEN from "@tweenjs/tween.js";
import { type IScene } from "./DefinedScenes/IScene";
import ScenesRegistryH from "./DefinedScenes/ScenesRegistryH";
import { option } from "fp-ts";
import type { INotification } from "mediatr-ts";
import SectionWasChangedToID from "./DefinedScenes/Events/SectionWasChangedTo";

/**
 * @deprecated use IScene
 */
export interface ICameraScene__ {
	name: string;
	crane: THREE.Object3D;
	camera: THREE.PerspectiveCamera;
}

/**
 * Contains ordered scenes to easyly interpolate in them idk
 * @deprecated use asi.data.ScenesRegistry for data acessing and SceeneTweenerH for some contols
 */
export class CameraScenes {
	public readonly scenes: Array<ICameraScene__>;
	private _currentScene: ICameraScene__;
	public get currentScene(): ICameraScene__ {
		return this._currentScene;
	}

	public constructor(scenes: Array<ICameraScene__>) {
		this.scenes = scenes;
		this._currentScene = this.scenes.find(
			(obj) => obj.name === EGLTF_PARAMS.CAMERA_SCENE_NAME.INTRO_SECTION
		)!;
		this.tweenToScene(EGLTF_PARAMS.CAMERA_SCENE_NAME.INTRO_SECTION, 0);
	}

	public tweenToScene(nextScene: string, tweenTime: number = 2) {
		const endSceneO = ScenesRegistryH.findISceneByName(nextScene);
		if (option.isNone(endSceneO)) return;
		const endScene = endSceneO.value;

		const nextCrain = endScene.crane;
		const nextCamera = endScene.camera;

		const interpolation = TWEEN.Interpolation.Linear;
		// asi.data.CAMERA_CRAIN.tweenTo(nextCrain, tweenTime);
		// asi.data.CameraManager.tweenTo(nextCamera, tweenTime);

		asi.mediator.publish(new SectionWasChangedToID(endScene.nameID));
	}
}
/**
 * @deprecated SceneRegistryH
 */
export class CameraScenesExtractorH___ {
	/**
	 * extracts CameraScene[] from gltf scene
	 */
	public static extract__(): CameraScenes {
		const scene = asi.data.ThreeScene;
		const scenes: Array<ICameraScene__> = [];

		// get cranes
		const cranes = ThreeObjectFinderH.byUserData(
			scene,
			EGLTF_PARAMS.ROLE.this,
			EGLTF_PARAMS.ROLE.CAMERA_CRANE
		);
		console.warn("CameraScenesExtractor: found '" + cranes.length + "' cranes");

		// for each crane get its camera and create CameraScene
		for (let i = 0; i < cranes.length; i++) {
			const crane = cranes[i];
			const sceneName = crane.userData[EGLTF_PARAMS.CAMERA_SCENE_NAME.this];

			const camera = ThreeObjectFinderH.byUserData(
				crane, // search in this ones childs
				EGLTF_PARAMS.ROLE.this,
				EGLTF_PARAMS.ROLE.CRANED_CAMERA
			)[0] as THREE.PerspectiveCamera;

			const cameraScene: ICameraScene__ = { name: sceneName, crane: crane, camera: camera };
			scenes.push(cameraScene);
		}

		const registry = new CameraScenes(scenes);
		return registry;
	}
}

/**
 * @deprecated no named controlls at all
 */
export class ECAMERA_SCENE_NAME___ implements IEnumClass {
	public readonly this = "CAMERA_SCENE_NAME";

	public readonly INTRO_SECTION = "INTRO_SECTION"; //0

	public readonly LAND_SECTION = "LAND_SECTION"; // 1
	public readonly ABOUT_SECTION = "ABOUT_SECTION"; // 2
	public readonly PROJECTS_SECTION = "PROJECTS_SECTION"; // 3
	public readonly EXPERIENCE_SECTION = "EXPERIENCE_SECTION"; // 4
	public readonly EDUCATION_SECTION = "EDUCATION_SECTION"; // 5
	public readonly COMMENT_SECTION = "COMMENT_SECTION"; // 6
	public readonly CONTACT_SECTION = "CONTACT_SECTION"; // 7

	public readonly ERROR_404_PAGE = "ERROR_404_PAGE"; // 99
}
