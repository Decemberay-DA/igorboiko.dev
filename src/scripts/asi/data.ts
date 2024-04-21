import { type App, getCurrentInstance } from "vue";
import type CameraManager from "../CameraManagiment/CameraManager";
import type { ACursorStranding } from "../MegaCursor/CursorStranding/ACursorStranding";
import { CursorStrandingBuilderH } from "../MegaCursor/CursorStranding/CursorStrandingBuilderH";
import type { TJ } from "../ThreeJS";
import type { THREE } from "../ThreeJS/ThreeEngine/THREE";
import { CursorFollower } from "../MegaCursor/CursorFollower/CursorFollower";
import type { GLTF } from "three/examples/jsm/Addons.js";
import { CurrentSceneFromDOMDetector } from "../VueTSHelpers/CurrentSceneFromDOMDetector";
import ScenesRegistry from "../CameraManagiment/DefinedScenes/SceneRegistry/ScenesRegistry";

/**
 * compile time complete thing
 */
export default class data {
	// html ========-====-====-====-============
	private readonly CurrentSectionDetector = new CurrentSceneFromDOMDetector();

	public get vueApp(): App<any> {
		return getCurrentInstance()!.appContext.app;
	}

	// cursor effects ========-====-====-====-============

	// cursor effects ========-====-====-====-============
	public Cursor: ACursorStranding = CursorStrandingBuilderH.getPlatformDependend();
	public readonly CursorFollower = new CursorFollower();

	// three ========-====-====-====-============
	public readonly ScenesRegistry = new ScenesRegistry();
	public ThreeSceneManagimented!: TJ.ThreeScene;
	public ThreeSceneGLTF!: GLTF;
	public get ThreeScene(): THREE.Scene {
		return this.ThreeSceneManagimented.scene;
	}

	// camera controllers
	public CameraManager!: CameraManager;

	// app ========-====-====-====-============
}
