import { THREE } from "../ThreeJS";
import type { IRGB } from "../utils/IRGB";

/**
 * "Lerp deez nuts in your mouth, smoothly"
 * 						- Jason Statham.
 */
export class LerpH {
	static readonly number = (start: number, end: number, t: number): number => {
		return start * (1 - t) + end * t;
	};
	static readonly Number = (start: number, end: number, t: number): number => {
		const x = LerpH.number(start, end, t);
		return x;
	};
	/**
	 *
	 */
	static readonly Vector2 = (start: THREE.Vector2, end: THREE.Vector2, t: number): THREE.Vector2 => {
		const result = new THREE.Vector2();
		result.x = LerpH.number(start.x, end.x, t);
		result.y = LerpH.number(start.y, end.y, t);

		return result;
	};
	static readonly Vector3 = (start: THREE.Vector3, end: THREE.Vector3, t: number): THREE.Vector3 => {
		const result = new THREE.Vector3();
		result.x = LerpH.number(start.x, end.x, t);
		result.y = LerpH.number(start.y, end.y, t);
		result.z = LerpH.number(start.z, end.z, t);

		return result;
	};
	static readonly IRGB = (start: IRGB, end: IRGB, t: number): IRGB => {
		const result: IRGB = {
			r: LerpH.number(start.r, end.r, t),
			g: LerpH.number(start.g, end.g, t),
			b: LerpH.number(start.b, end.b, t),
		};

		return result;
	};
	static readonly Vector4 = (start: THREE.Vector4, end: THREE.Vector4, t: number): THREE.Vector4 => {
		const result = new THREE.Vector4();
		result.x = LerpH.number(start.x, end.x, t);
		result.y = LerpH.number(start.y, end.y, t);
		result.z = LerpH.number(start.z, end.z, t);
		result.w = LerpH.number(start.w, end.w, t);

		return result;
	};
	static readonly Quaternion = (
		start: THREE.Quaternion,
		end: THREE.Quaternion,
		t: number
	): THREE.Quaternion => {
		const anInstance = new THREE.Quaternion();

		const result = anInstance.slerpQuaternions(start, end, t);

		return result;
	};
}
