import * as THREE from "three";
import { asi } from "../asi/asi";
import { ObjectFinder } from "../ThreeJS/Helpers/ObjectFinder";
import { EGLTF_PARAMS } from "../asi/asiSpesificks";
import type { IEnumClass } from "../utils/AEnumClass";
import * as TWEEN from "@tweenjs/tween.js";

/**
 * Contains ordered scenes to easyly interpolate in them idk
 */
export class CameraScenes {
	public readonly scenes: Array<CameraScene>;
	private _currentScene: CameraScene;
	public get currentScene(): CameraScene {
		return this._currentScene;
	}

	public constructor(scenes: Array<CameraScene>) {
		this.scenes = scenes;
		this._currentScene = this.scenes.find(
			(obj) => obj.name === EGLTF_PARAMS.CAMERA_SCENE_NAME.INTRO_SECTION
		)!;
		this.tweenToScene(EGLTF_PARAMS.CAMERA_SCENE_NAME.INTRO_SECTION, 0);
	}

	public tweenToScene(nextScene: string | CameraScene, tweenTime: number = 2) {
		const endScene = this.findSceneFromName(nextScene);
		const nextCrain = endScene.crane;
		const nextCamera = endScene.camera;

		console.warn("CameraScenes.tweenToScene: next crane");
		console.warn(nextCrain);
		console.warn("CameraScenes.tweenToScene: next camera ");
		console.warn(nextCamera);

		tweenTime = 1;
		const interpolation = TWEEN.Interpolation.Linear;
		asi.data.CAMERA_CRAIN.tweenTo(nextCrain, tweenTime);
		asi.data.CAMERA_MANAGER.tweenTo(nextCamera, tweenTime);

		this._currentScene = endScene;
	}

	public findSceneFromName(nextScene: string | CameraScene) {
		let endScene: CameraScene;
		if (nextScene instanceof CameraScene) {
			endScene = nextScene;
		} else {
			const x = this.scenes.find((s) => s.name === nextScene);
			if (x) {
				endScene = x;
			} else {
				throw new Error("scene with name '" + nextScene + "' not found");
			}
		}
		return endScene;
	}
}

export class CameraScenesExtractor {
	/**
	 * extracts CameraScene[] from gltf scene
	 */
	public static extract(): CameraScenes {
		const scene = asi.data.THREE_SCENE;
		const scenes: Array<CameraScene> = [];

		// get cranes
		const cranes = ObjectFinder.ByUserData(scene, EGLTF_PARAMS.ROLE.this, EGLTF_PARAMS.ROLE.CAMERA_CRANE);
		console.warn("CameraScenesExtractor: found '" + cranes.length + "' cranes");

		// for each crane get its camera and create CameraScene
		for (let i = 0; i < cranes.length; i++) {
			const crane = cranes[i];
			const sceneName = crane.userData[EGLTF_PARAMS.CAMERA_SCENE_NAME.this];

			const camera = ObjectFinder.ByUserData(
				crane, // search in this ones childs
				EGLTF_PARAMS.ROLE.this,
				EGLTF_PARAMS.ROLE.CRANED_CAMERA
			)[0] as THREE.PerspectiveCamera;

			const cameraScene = new CameraScene(sceneName, crane, camera);
			scenes.push(cameraScene);
		}

		const registry = new CameraScenes(scenes);
		return registry;
	}
}

export class ECAMERA_SCENE_NAME implements IEnumClass {
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

/**
 * Dataclass to hold scenes
 * eq camera and crane state
 */
class CameraScene {
	public readonly name: string;
	public readonly crane: THREE.Object3D;
	public readonly camera: THREE.PerspectiveCamera;

	public constructor(name: string, crane: THREE.Object3D, camera: THREE.PerspectiveCamera) {
		this.name = name;
		this.crane = crane;
		this.camera = camera;
	}
}
