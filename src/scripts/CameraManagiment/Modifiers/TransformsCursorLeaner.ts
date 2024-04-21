import { asi } from "@/scripts/asi/asi";
import type { IModifier } from "../../utils/IModifierStack";
import { Transforms } from "../ParamsControllers/Transforms/Transforms";
import { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";

/**
 * make object lean towards cursor relative to inpot transforms
 */
export class TransformsCursorLeaner implements IModifier<Transforms> {
	/**
	 * meters
	 */
	public strength: number;
	/**
	 * helps to fix bug when if leaned to early will get
	 */
	public influence: number = 1;
	private get influensedStrength() {
		return this.strength * this.influence;
	}

	public constructor(strength: number = 5) {
		this.strength = strength;
	}

	public apply(object: Transforms): Transforms {
		let cursor = asi.data.Cursor.clientRelstive.positionNegative1toPositive1;
		cursor.multiplyScalar(this.influensedStrength);

		const t = new Transforms(object);

		const leanedTransforms = new Transforms({
			position: new THREE.Vector3(
				t.position.x,
				t.position.y - cursor.y, // vertical is mf finally ok
				t.position.z - cursor.x // horizontall is ok
			),
			quaternion: t.quaternion.clone(),
			scale: t.scale.clone(),
		});

		return leanedTransforms;
	}
}
