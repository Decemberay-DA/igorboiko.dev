import { TransformsNoiser } from "../CameraManagiment/Modifiers/TransformsNoiser";
import { Transforms } from "../CameraManagiment/ParamsControllers/Transforms";
import { GE } from "../GameEngine";
import type { THREE } from "../ThreeJS/THREE";

export class ObjectsTransformsNoiser extends GE.ADynamicObject {
	public readonly noiser = new TransformsNoiser();

	public readonly object: THREE.Object3D;
	public readonly originalTransforms: Transforms;

	public constructor(object: THREE.Object3D) {
		super();

		this.object = object;
		this.originalTransforms = new Transforms(this.object);
	}

	public override onFrameUpdate(): void {
		let noisedTransforms = this.originalTransforms.clone();
		noisedTransforms = this.noiser.apply(noisedTransforms);

		noisedTransforms.applyParamsTo(this.object);
	}
}
