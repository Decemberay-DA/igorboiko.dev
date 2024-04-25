import type { THREE } from "../ThreeEngine";

export type TGLTFAsset = THREE.Object3D & {
	copyright?: string | undefined;
	generator?: string | undefined;
	version?: string | undefined;
	minVersion?: string | undefined;
	extensions?: any;
	extras?: any;
};
