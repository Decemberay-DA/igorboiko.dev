import { GE } from "../GameEngine";
import type { THREE } from "../ThreeJS/THREE";

interface IProcess {
	star: THREE.Object3D;
	coroutine: GE.Coroutine;
}

/**
 * sometimes launches coruotines to animate stars
 */
export class StarsRandomFlickerage extends GE.ADynamicObject {
	/** that are executing right now */
	private processes: Array<IProcess> = new Array<IProcess>();
	private allStart: Array<THREE.Object3D> = new Array<THREE.Object3D>();

	/** coroutines launched pper secind */
	public launchFrequency: number = 4;

	public constructor() {
		super();
	}

	private launchCoroutineFor(star: THREE.Object3D) {
		// create and launch coroutine
	}

	public override onStart(): void {
		// find all stars
	}
}
