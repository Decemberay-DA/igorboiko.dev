import * as THREE from "three";
import { CameraManager } from "../CameraManagiment/CameraManager";
import type { CameraScenes } from "../CameraManagiment/CameraScenes";
import { getCurrentInstance, type App } from "vue";
import EDefinedSections from "../VueTSHelper/EDefinedSections";
import { EDefinedLayers } from "../VueTSHelper/EDefinedLayers";
import type { CameraCrain } from "../CameraManagiment/CameraCrain";
import type { TJ } from "../ThreeJS";

/**
 * compile time complete thing
 */
export class data {
	// html ========-====-====-====-============
	public readonly DefinedSections = new EDefinedSections();
	public readonly DefinedLayers = new EDefinedLayers();

	public get vueApp(): App<any> {
		return getCurrentInstance()!.appContext.app;
	}

	// three ========-====-====-====-============
	// camera
	public CAMERA_MANAGER!: CameraManager;
	public CAMERA_CRAIN!: CameraCrain;
	public CAMERA_SCENES!: CameraScenes;
	// three
	public THREE_MANAGIMENTED_SCENE!: TJ.ThreeScene;
	public get THREE_SCENE(): THREE.Scene {
		return this.THREE_MANAGIMENTED_SCENE.scene;
	}

	// app ========-====-====-====-============
}
