import { SimplexNoise } from "three/examples/jsm/Addons.js";
import type { IModifier } from "../../utils/IModifierStack";
import { Transforms } from "../ParamsControllers/Transforms";
import { GE } from "../../GameEngine";
import { THREE } from "../../ThreeJS/ThreeEngine/THREE";
import { SmoothLerper } from "../Lerper";

/**
 * applyes perlin to transforms
 */
export class TransformsNoiser implements IModifier<Transforms> {
	public influencePosition = 1;
	public speedPosition = 1;
	public influenceQuaternion = 1;
	public speedQuaternion = 1;
	public influenceScale = 0;

	public readonly positionNoise: SimplexNoise = new SimplexNoise();
	public readonly QuaternionNoise: SimplexNoise = new SimplexNoise();
	public readonly ScaleNoise: SimplexNoise = new SimplexNoise();

	private p = 789654314232;
	private q = -97846512;
	private s = 0.845132;

	apply(object: Transforms): Transforms {
		const time = GE.GameTime.realTimeSinceStartup;
		const noisedTransforms = new Transforms(object);

		if (this.influencePosition > 0) {
			const positionNoise = new THREE.Vector3(
				this.positionNoise.noise(this.p + 100, time * this.speedPosition),
				this.positionNoise.noise(this.p + 200, time * this.speedPosition),
				this.positionNoise.noise(this.p + 303, time * this.speedPosition)
			);
			const inf = SmoothLerper.instance.Vector3(
				noisedTransforms.position,
				positionNoise,
				this.influencePosition
			);
			noisedTransforms.position.copy(inf);
		}

		if (this.influenceQuaternion > 0) {
			const angleNoise = new THREE.Euler(
				this.QuaternionNoise.noise(this.q + 100, time * this.speedQuaternion),
				this.QuaternionNoise.noise(this.q + 200, time * this.speedQuaternion),
				this.QuaternionNoise.noise(this.q + 303, time * this.speedQuaternion),
				"XYZ"
			);
			const quaternionNoise = new THREE.Quaternion().setFromEuler(angleNoise);
			const inf = SmoothLerper.instance.Quaternion(
				noisedTransforms.quaternion,
				quaternionNoise,
				this.influenceQuaternion
			);
			noisedTransforms.quaternion.copy(inf);
		}

		if (this.influenceScale > 0) {
			const scaleNoise = new THREE.Vector3(
				this.ScaleNoise.noise(this.s + 100, time),
				this.ScaleNoise.noise(this.s + 200, time),
				this.ScaleNoise.noise(this.s + 303, time)
			);
			const inf = SmoothLerper.instance.Vector3(
				noisedTransforms.scale,
				scaleNoise,
				this.influenceQuaternion
			);
			noisedTransforms.scale.copy(inf);
		}

		return noisedTransforms;
	}
}
