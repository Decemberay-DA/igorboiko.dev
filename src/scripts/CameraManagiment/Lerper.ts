import * as THREE from "three";

/**
 * "Lerp deez nuts in your mouth"
 * 						- Jason Statham.
 */
export class Lerper {
	public static lerpNumber(start: number, end: number, t: number): number {
		return start * (1 - t) + end * t;
	}
	public static lerpVector2(start: THREE.Vector2, end: THREE.Vector2, t: number): THREE.Vector2 {
		const result = new THREE.Vector2();
		result.x = start.x * (1 - t) + end.x * t;
		result.y = start.y * (1 - t) + end.y * t;
		return result;
	}
	public static lerpVector3(start: THREE.Vector3, end: THREE.Vector3, t: number): THREE.Vector3 {
		const result = new THREE.Vector3();
		result.x = start.x * (1 - t) + end.x * t;
		result.y = start.y * (1 - t) + end.y * t;
		result.z = start.z * (1 - t) + end.z * t;
		return result;
	}
	public static lerpVector4(start: THREE.Vector4, end: THREE.Vector4, t: number): THREE.Vector4 {
		const result = new THREE.Vector4();
		result.x = start.x * (1 - t) + end.x * t;
		result.y = start.y * (1 - t) + end.y * t;
		result.z = start.z * (1 - t) + end.z * t;
		result.w = start.w * (1 - t) + end.w * t;
		return result;
	}
	public static lerpQuaternion(
		start: THREE.Quaternion,
		end: THREE.Quaternion,
		t: number
	): THREE.Quaternion {
		const result = new THREE.Quaternion();
		result.copy(start).slerp(end, t);
		return result;
	}
}
