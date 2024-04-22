import type { GLTF } from "three/examples/jsm/Addons.js";
import { type App, getCurrentInstance } from "vue";
import type CameraManager from "../CameraManagiment/CameraManager";
import ScenesRegistry from "../CameraManagiment/DefinedScenes/SceneRegistry/ScenesRegistry";
import type { TJ, THREE } from "../ThreeJS";
import { CurrentSceneFromDOMDetector } from "../VueTSHelpers";
import { CursorFollower } from "../MegaCursor/CursorFollower";
import { ACursorStranding, CursorStrandingBuilderH } from "../MegaCursor/CursorStranding";




/**
 * compile time complete thing
 */
export default class data {
	// html ========-====-====-====-============
	private readonly CurrentSceneFromDOMDetector = new CurrentSceneFromDOMDetector();

	public get vueApp(): App<any> {
		return getCurrentInstance()!.appContext.app;
	}

	// cursor effects ========-====-====-====-============

	// cursor effects ========-====-====-====-============
	public Cursor: ACursorStranding = CursorStrandingBuilderH.getPlatformDependend();
	// public readonly CursorFollower = new CursorFollower();

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
