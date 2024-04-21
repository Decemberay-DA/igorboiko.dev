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
		const direction = new THREE.Vector3()
			.subVectors(this.camera.position, this.object.position)
			.normalize();

		this.object.lookAt(this.camera.position);
	}
}
