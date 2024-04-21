import { THREE } from "../ThreeJS/ThreeEngine/THREE";
import { CameraControls } from "./ParamsControllers/CameraControls/CameraControls";
import { type ICameraControls } from "./ParamsControllers/CameraControls/ICameraControls";
import { Transforms } from "./ParamsControllers/Transforms/Transforms";
import { type ITransforms } from "./ParamsControllers/Transforms/ITransforms";
import { instance } from "three/examples/jsm/nodes/Nodes.js";

/**
 * "Lerp deez nuts in your mouth, smoothly"
 * 						- Jason Statham.
 */
export class SmoothLerper {
	private static _instance = new SmoothLerper();
	public static get instance() {
		return SmoothLerper._instance;
	}
	public smoothness = 0;
	/**
	 * the actual lerp value that is getting smoothed
	 */
	private _smoothed_smoothness: number;
	private _last_saved_smoothed_smoothness: number;

	/**
	 * @param smoothness 0 is no 1 is max
	 */
	public constructor(smoothness = 1) {
		this.smoothness = smoothness;
		this._smoothed_smoothness = smoothness;
		this._last_saved_smoothed_smoothness = smoothness;
	}

	/**
	 * here how smoothing works:
	 * b - lerp(last_saved_position, needed_position, smoothness)
	 * afret this method internal this.smoothed_smoothness is smoothed
	 * and can be used in other methods to smooth stuff
	 */
	private updateSmoothness(targetSmoothness: number): number {
		this._smoothed_smoothness = this.Number(
			this._last_saved_smoothed_smoothness,
			targetSmoothness,
			this.smoothness,
			false
		);

		this._last_saved_smoothed_smoothness = this._smoothed_smoothness;

		return this._smoothed_smoothness;
		// return targetSmoothness; // test
	}

	/**
	 * no smoothness applied
	 */
	public static number(start: number, end: number, t: number): number {
		return start * (1 - t) + end * t;
	}
	public Number(start: number, end: number, t: number, isSmooth = true): number {
		if (isSmooth) t = this.updateSmoothness(t);

		const x = SmoothLerper.number(start, end, t);

		return x;
	}
	public Vector2(start: THREE.Vector2, end: THREE.Vector2, t: number, isSmooth = true): THREE.Vector2 {
		if (isSmooth) t = this.updateSmoothness(t);

		const result = new THREE.Vector2();
		result.x = SmoothLerper.number(start.x, end.x, t);
		result.y = SmoothLerper.number(start.y, end.y, t);

		return result;
	}
	public Vector3(start: THREE.Vector3, end: THREE.Vector3, t: number, isSmooth = true): THREE.Vector3 {
		if (isSmooth) t = this.updateSmoothness(t);

		const result = new THREE.Vector3();
		result.x = SmoothLerper.number(start.x, end.x, t);
		result.y = SmoothLerper.number(start.y, end.y, t);
		result.z = SmoothLerper.number(start.z, end.z, t);

		return result;
	}
	public Vector4(start: THREE.Vector4, end: THREE.Vector4, t: number, isSmooth = true): THREE.Vector4 {
		if (isSmooth) t = this.updateSmoothness(t);

		const result = new THREE.Vector4();
		result.x = SmoothLerper.number(start.x, end.x, t);
		result.y = SmoothLerper.number(start.y, end.y, t);
		result.z = SmoothLerper.number(start.z, end.z, t);
		result.w = SmoothLerper.number(start.w, end.w, t);

		return result;
	}
	public Quaternion(
		start: THREE.Quaternion,
		end: THREE.Quaternion,
		t: number,
		isSmooth = true
	): THREE.Quaternion {
		if (isSmooth) t = this.updateSmoothness(t);
		const anInstance = new THREE.Quaternion();

		const result = anInstance.slerpQuaternions(start, end, t);

		return result;
	}

	public Transforms(start: ITransforms, end: ITransforms, t: number, isSmooth = true): Transforms {
		if (isSmooth) t = this.updateSmoothness(t);

		const result: ITransforms = {
			position: this.Vector3(start.position, end.position, t, false),
			quaternion: this.Quaternion(start.quaternion, end.quaternion, t, false),
			scale: this.Vector3(start.scale, end.scale, t, false),
		};

		return new Transforms(result);
	}
	public CameraControls(
		start: ICameraControls,
		end: ICameraControls,
		t: number,
		isSmooth = true
	): CameraControls {
		if (isSmooth) t = this.updateSmoothness(t);

		const result = new CameraControls({
			fov: SmoothLerper.number(start.fov, end.fov, t),
			aspect: SmoothLerper.number(start.aspect, end.aspect, t),
			near: SmoothLerper.number(start.near, end.near, t),
			far: SmoothLerper.number(start.far, end.far, t),
			zoom: SmoothLerper.number(start.zoom, end.zoom, t),
		});

		return result;
	}
}
