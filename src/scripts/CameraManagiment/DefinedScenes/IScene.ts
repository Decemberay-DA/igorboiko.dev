import type { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";

/**
 * for common stuff
 */
export type TAnyScene = IScene | ITHREEScene | IHTMLScene;

/**
 * the ones that overlaps by nameID
 */
export interface IScene extends IHTMLScene, ITHREEScene {}

/**
 *
 */
export interface ISceneID {
	nameID: string;
}

/**
 * sections on html website
 */
export interface IHTMLScene extends ISceneID {
	htmlElement: HTMLElement;
}
/**
 * camera position in 3d three scene
 */
export interface ITHREEScene extends ISceneID {
	camera: THREE.PerspectiveCamera;
	crane: THREE.Object3D;
}
