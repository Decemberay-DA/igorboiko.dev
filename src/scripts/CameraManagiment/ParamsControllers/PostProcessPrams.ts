import type { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
import type { TMemento } from "./IObjectsGroupeParametersController";

/**
 * yo gess
 */
export class PostProcessPrams {
	public distanceToCenter!: THREE.Vector3;
	public noisiness!: number;
	public screenCursorPosition!: THREE.Vector2;
	public mouseWasClickedSecondsAgo!: number;
}
