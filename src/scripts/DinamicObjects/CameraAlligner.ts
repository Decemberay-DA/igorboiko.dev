import { pipe } from "fp-ts/lib/function";
import asi from "../asi/asi";
import { GE } from "../GameEngine";
import { THREE } from "../ThreeJS/ThreeEngine/THREE";

/**
 * rotate this object so its Y axis is alway pointing to the camera idk
 */
export class CameraAlligner extends GE.ADynamicObject {
	public readonly object!: THREE.Object3D;
	public get camera() {
		return asi.data.ThreeSceneManagimented.camera;
	}
	public override onFrameUpdate(): void {
		CameraAllignerH.alignObject(this.object, this.camera);
	}
}

export class CameraAllignerH {
	public static alignObject(
		object: THREE.Object3D,
		camera: THREE.Object3D = asi.data.ThreeSceneManagimented.camera
	): THREE.Object3D {
		const direction = pipe(
			new THREE.Vector3(),
			(v) => v.subVectors(camera.position, camera.position),
			(v) => v.normalize()
		);

		object.lookAt(camera.position);

		return object;
	}
}
