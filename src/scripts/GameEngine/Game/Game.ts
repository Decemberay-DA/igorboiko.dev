import { GE } from "..";

/**
 * game idk
 * @deprecated use somwthing from GameEngineFunctional
 */
export class Game implements GE.IEnablable {
	// IEnablable ========-====-====-====-============
	protected __isEnabled: boolean = true;
	public get isEnabled(): boolean {
		return this.__isEnabled;
	}
	public enable(): void {
		this.__isEnabled = true;
		requestAnimationFrame(() => this.update());
		console.log("Component enabled.");
	}
	public disable(): void {
		this.__isEnabled = false;
		console.log("Component disabled.");
	}

	// Singletonin ========-====-====-====-============
	private static instance: Game;
	private constructor() {}
	public static getInstance(): Game {
		if (!Game.instance) Game.instance = new Game();
		return Game.instance;
	}

	// DynamicObject registration ========-====-====-====-============
	private _dynamicObjects: GE.ADynamicObject[] = [];
	public get dynamicObjects(): Readonly<Array<GE.ADynamicObject>> {
		return Object.freeze([...this._dynamicObjects]);
	}
	public async registerDinamicObject(dynamicObject: GE.ADynamicObject): Promise<void> {
		this._dynamicObjects.push(dynamicObject);
		this._dynamicObjects.sort((a, b) => a.onFrameUpdatePriority - b.onFrameUpdatePriority);
		// console.log(`DynamicObject registered`);

		// start this object if it added after first frame start of the game
		// if (this._isStarted !== true) {
		// 	dynamicObject.onStart();
		// }
	}
	public async unRegisterDinamicObject(dynamicObject: GE.ADynamicObject): Promise<void> {
		const index = this._dynamicObjects.indexOf(dynamicObject);
		if (index > -1) {
			// if found
			this._dynamicObjects.splice(index, 1);
			// console.log(`DynamicObject un registered`);
		}
	}
	// Game loop ========-====-====-====-============
	// private _isStarted = false;
	public triggerStart(): void {
		this.start();
	}
	private start(): void {
		this._dynamicObjects.forEach((dynamicObject) => {
			dynamicObject.onStart();
		});
		// this._isStarted = true;
		this.update();
	}
	private update(): void {
		// what about WASM???? dooooodeee noooooooooo
		// dont update anything if disable
		if (!this.__isEnabled) return;

		this._dynamicObjects.forEach((dynamicObject) => {
			if (dynamicObject.isEnabled) {
				dynamicObject.onFrameUpdate();
			}
		});

		// console.log(
		// 	`Game updated "${GE.GameTime.currentFrame}", current time "${GE.GameTime.realTimeSinceStartup}", delta time "${GE.GameTime.deltaTime}"`
		// );

		requestAnimationFrame(() => this.update()); // Continue the loop
	}
}
