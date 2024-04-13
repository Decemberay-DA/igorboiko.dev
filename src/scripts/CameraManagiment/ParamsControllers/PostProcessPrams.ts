import type { THREE } from "@/scripts/ThreeJS/THREE";
import type { IMemento } from "./IObjectsGroupeParametersController";

/**
 * yo gess
 */
export class PostProcessPrams {
	public distanceToCenter!: THREE.Vector3;
	public noisiness!: number;
	public screenCursorPosition!: THREE.Vector2;
	public mouseWasClickedSecondsAgo!: number;
}
