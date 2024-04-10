import type { Object3D } from "three";


/**
 *
 * Defines a controller for a params pf an object
 *
 */
export interface IObjectParametersController<TParamsController, TControlledObject> {
	lerpBetween(start: TParamsController, end: TParamsController, factor: number): TParamsController;
	applyParamsTo(camera: TControlledObject): void;
}
