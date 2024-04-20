import { type App, getCurrentInstance } from "vue";
import type { CameraManager } from "../CameraManagiment/CameraManager";
import type { CameraScenes } from "../CameraManagiment/CameraScenes___";
import type { ACursorStranding } from "../MegaCursor/CursorStranding/ACursorStranding";
import { CursorStrandingBuilderH } from "../MegaCursor/CursorStranding/CursorStrandingBuilderH";
import type { TJ } from "../ThreeJS";
import type { THREE } from "../ThreeJS/ThreeEngine/THREE";
import { EDEFINED_LAYERS } from "../VueTSHelper/EDefinedLayers___";
import EDefinedSections from "../VueTSHelper/EDefinedSections___";
import { CursorFollower } from "../MegaCursor/CursorFollower/CursorFollower";
import type { GLTF } from "three/examples/jsm/Addons.js";
import { CurrentSceneFromDOMDetector } from "../VueTSHelper/CurrentSceneFromDOMDetector";
import { ScenesRegistry } from "../CameraManagiment/DefinedScenes/ScenesRegistry";

/**
 * compile time complete thing
 */
export class data {
	// html ========-====-====-====-============
	/**@deprecated asi.data SceneRegistry */
	public readonly DefinedSections = new EDefinedSections();
	public readonly CurrentSectionDetector = new CurrentSceneFromDOMDetector();
	/**@deprecated */
	public readonly DefinedLayers = new EDEFINED_LAYERS();

	public get vueApp(): App<any> {
		return getCurrentInstance()!.appContext.app;
	}

	// cursor effects ========-====-====-====-============

	// cursor effects ========-====-====-====-============
	public Cursor: ACursorStranding = CursorStrandingBuilderH.getPlatformDependend();
	public readonly CursorFollower = new CursorFollower();

	// three ========-====-====-====-============
	public ScenesRegistry = new ScenesRegistry();

	// camera controllers
	public CameraManager!: CameraManager;
	// camera scenes
	/**@deprecated asi.data SceneRegistry */
	public CAMERA_SCENES!: CameraScenes;
	// three
	public ThreeSceneManagimented!: TJ.ThreeScene;
	public ThreeSceneGLTF!: GLTF;
	public get ThreeScene(): THREE.Scene {
		return this.ThreeSceneManagimented.scene;
	}

	// app ========-====-====-====-============
}
