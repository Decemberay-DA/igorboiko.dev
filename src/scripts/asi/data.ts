import { type App, getCurrentInstance } from "vue";
import type { CameraCrain } from "../CameraManagiment/CameraCrain";
import type { CameraManager } from "../CameraManagiment/CameraManager";
import type { CameraScenes } from "../CameraManagiment/CameraScenes";
import type { ACursorStranding } from "../MegaCursor/CursorStranding/ACursorStranding";
import { CursorStrandingBuilder } from "../MegaCursor/CursorStranding/CursorStrandingBuilder";
import type { TJ } from "../ThreeJS";
import type { THREE } from "../ThreeJS/THREE";
import { EDEFINED_LAYERS } from "../VueTSHelper/EDefinedLayers";
import EDefinedSections from "../VueTSHelper/EDefinedSections";
import { CursorFollower } from "../MegaCursor/CursorFollower/CursorFollower";
import type { GLTF } from "three/examples/jsm/Addons.js";
import { CurrentSectionDetector } from "../VueTSHelper/CurrentSectionDetector";

/**
 * compile time complete thing
 */
export class data {
	// html ========-====-====-====-============
	public readonly DefinedSections = new EDefinedSections();
	public readonly CurrentSectionDetector = new CurrentSectionDetector();
	public readonly DefinedLayers = new EDEFINED_LAYERS();

	public get vueApp(): App<any> {
		return getCurrentInstance()!.appContext.app;
	}

	// cursor effects ========-====-====-====-============

	// cursor effects ========-====-====-====-============
	public Cursor: ACursorStranding = CursorStrandingBuilder.getPlatformDependend();
	public readonly CursorFollower = new CursorFollower();

	// three ========-====-====-====-============
	// camera controllers
	public CAMERA_MANAGER!: CameraManager;
	public CAMERA_CRAIN!: CameraCrain;
	// camera scenes
	public CAMERA_SCENES!: CameraScenes;
	// three
	public THREE_MANAGIMENTED_SCENE!: TJ.ThreeScene;
	public GLTF_THREE_SCENE!: GLTF;
	public get THREE_SCENE(): THREE.Scene {
		return this.THREE_MANAGIMENTED_SCENE.scene;
	}

	// app ========-====-====-====-============
}

class EntityRegistry<TEntity> {}
