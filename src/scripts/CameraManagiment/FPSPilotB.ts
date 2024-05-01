import { THREE } from "../ThreeJS";
import { IDinamicUpdateB } from "../GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdateB";
import { IEnableableB } from "../GameEngineFunctional/ADTs/IEnableable/IEnableableB";
import type { IDinamicObject } from "../GameEngineFunctional/ADTs/IDinamicObject/IDinamicObject";
import type { LazyArg } from "fp-ts/lib/function";

export interface IFPSPilot {
	controlled: THREE.Object3D;
	speed: number;
}
interface ICameraKeys extends Record<string, boolean> {
	W: boolean;
	A: boolean;
	S: boolean;
	D: boolean;
	Q: boolean;
	E: boolean;
}

/**
 *
 */
export class FPSPilotB {
	static readonly onKeyDown = (keys: LazyArg<ICameraKeys>) => (event: KeyboardEvent) => {
		const key = event.key.toUpperCase();
		if (keys().hasOwnProperty(key)) {
			keys()[key] = true;
			console.log("pressed: " + key);
		}
	};
	static readonly onKeyUp = (keys: LazyArg<ICameraKeys>) => (event: KeyboardEvent) => {
		const key = event.key.toUpperCase();
		if (keys().hasOwnProperty(key)) {
			keys()[key] = false;
			console.log("unpressed: " + key);
		}
	};

	static readonly new = (camera: THREE.Object3D): IDinamicObject & IFPSPilot => {
		// yo look: private scope limited variable omg
		let _keyMap: ICameraKeys = {
			W: false,
			A: false,
			S: false,
			D: false,
			Q: false,
			E: false,
		};
		const pilot: IFPSPilot = {
			controlled: camera,
			speed: 1,
		};
		return {
			...IDinamicUpdateB.new({
				onStart(time) {
					window.addEventListener(
						"keydown",
						FPSPilotB.onKeyDown(() => _keyMap)
					);
					window.addEventListener(
						"keyup",
						FPSPilotB.onKeyUp(() => _keyMap)
					);
				},
				onDelete(time) {
					window.removeEventListener(
						"keydown",
						FPSPilotB.onKeyDown(() => _keyMap)
					);
					window.removeEventListener(
						"keyup",
						FPSPilotB.onKeyUp(() => _keyMap)
					);
				},
				onFrameUpdate(time) {
					const direction = new THREE.Vector3();
					if (_keyMap.W) direction.z -= 1;
					if (_keyMap.S) direction.z += 1;
					if (_keyMap.A) direction.x -= 1;
					if (_keyMap.D) direction.x += 1;
					if (_keyMap.Q) direction.y -= 1;
					if (_keyMap.E) direction.y += 1;
					direction.normalize();

					camera.position.add(direction.multiplyScalar(pilot.speed * time.delta));
				},
			}),
			...IEnableableB.enabled(),
			...pilot,
		};
	};
}
