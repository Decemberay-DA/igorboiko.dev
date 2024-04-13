import type { THREE } from "../ThreeJS/THREE";
import type { IModifier } from "../utils/IModifierStack";

/**
 * make camera lean towards cursor
 */
export class CameraCursorLeaner implements IModifier<THREE.Object3D> {
	public apply(object: THREE.Object3D): THREE.Object3D {
		throw new Error("Method not implemented.");
	}
}
