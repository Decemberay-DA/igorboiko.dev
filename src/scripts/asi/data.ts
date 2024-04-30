import type { GLTF } from "three/examples/jsm/Addons.js";
import { type App, getCurrentInstance } from "vue";
import type CameraManager from "../CameraManagiment/CameraManager";
import ScenesRegistry from "../CameraManagiment/DefinedScenes/SceneRegistry/ScenesRegistry";
import type { TJ, THREE } from "../ThreeJS";

import { CursorStrandingBuilderH } from "../MegaCursor/CursorStranding";
import { CurrentSceneFromDOMDetectorB } from "../VueTSHelpers/CurrentSceneFromDOMDetectorB";

/**
 * compile time complete thing
 */
export default class data {
	public get vueApp(): App<any> {
		return getCurrentInstance()!.appContext.app;
	}

	// cursor effects ========-====-====-====-============

	// cursor effects ========-====-====-====-============
	public Cursor = CursorStrandingBuilderH.getPlatformDependend();
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
