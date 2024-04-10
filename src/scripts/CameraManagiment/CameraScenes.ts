import * as THREE from "three";
import { GE } from "../GameEngine";
import * as TWEEN from "@tweenjs/tween.js";
import type { TJ } from "../ThreeJS";
import { CameraControlls } from "./ParamsControllers/CameraControlls";
import { Transforms, IITransforms } from "./ParamsControllers/Transforms";
import asi from "../asi/asi";
import ObjectFinder from "../ThreeJS/Helpers/ObjectFinder";
import { EGLTF_PARAMS } from "../asi/asiSpesificks";
import AEnumClass from "../utils/AEnumClass";

/**
 * Contains ordered scenes to easyly interpolate in them idk
 */
export class CameraScenes {
	public readonly scenes: Array<CameraScene>;
	private _currentScene: CameraScene;
	public get currentScene(): CameraScene {
		return this._currentScene;
	}

	public get nextScene(): CameraScene {
		const currentScene = this._currentScene;
		let nextinedex = 0;
		try {
			nextinedex = this.scenes.findIndex((scene) => scene === currentScene) + 1;
		} catch (error) {}
		return this.scenes[nextinedex];
	}

	public constructor(scenes: Array<CameraScene>) {
		this.scenes = scenes;
		this._currentScene = this.scenes.find(
			(obj) => obj.name === EGLTF_PARAMS.CAMERA_SCENE_NAME.INTRO_CUTSCENE_POSITION
		)!;
	}

	public tweenToScene(sceneName: string) {
		const startScene = this.currentScene;
		const endScene = this.scenes.find((s) => s.name === sceneName)!;

		// do twening for camera and camera crane
		const nextCrain = endScene.crane;
		const nextCamera = endScene.camera;
		asi.data.CAMERA_CRAIN.tweenTo(nextCrain);
		asi.data.CAMERA_MANAGER.tweenTo(nextCamera);

		// finish
		this._currentScene = endScene;
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

		// for each crane get its camera nad create CameraScene
		for (let i = 0; i < cranes.length; i++) {
			const crane = cranes[i];
			const sceneName = crane.userData[EGLTF_PARAMS.CAMERA_SCENE_NAME.this];

			const camera = ObjectFinder.ByUserData(
				crane,
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

export class ECAMERA_SCENE_NAME extends AEnumClass {
	public readonly this = "CAMERA_SCENE_NAME";
	//
	public readonly INTRO_CUTSCENE_POSITION = "INTRO_CUTSCENE_POSITION";
	//
	public readonly MAIN_LAND = "MAIN_LAND";
	public readonly ABOUT_ME = "ABOUT_ME";
	public readonly MY_PROJECTS = "MY_PROJECTS";
	public readonly JOB_EXPERIENCE = "JOB_EXPERIENCE";
	public readonly EDUCATION_DEGREES_IDKACTUALLY = "EDUCATION_DEGREES_IDKACTUALLY";
	public readonly WHAT_I_AT_TALLKED_ABOUT = "WHAT_I_AT_TALLKED_ABOUT";
	//
	public readonly ERROR_404_PAGE = "ERROR_404_PAGE";
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
