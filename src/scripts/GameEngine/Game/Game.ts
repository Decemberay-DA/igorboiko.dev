import type { IDinamicObject } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObject";
import { GE } from "..";
import { BridgeH } from "../_bridge/Bridge";

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
	private _dynamicObjects: IDinamicObject[] = [];
	public get dynamicObjects(): Readonly<Array<IDinamicObject>> {
		return Object.freeze([...this._dynamicObjects]);
	}
	public async registerDinamicObject(dynamicObject: IDinamicObject): Promise<void> {
		this._dynamicObjects.push(dynamicObject);
		this._dynamicObjects.sort((a, b) => a.onFrameUpdateOrder - b.onFrameUpdateOrder);
	}
	public async unRegisterDinamicObject(dynamicObject: IDinamicObject): Promise<void> {
		const index = this._dynamicObjects.indexOf(dynamicObject);
		if (index > -1) {
			this._dynamicObjects.splice(index, 1);
		}
	}
	// Game loop ========-====-====-====-============
	// private _isStarted = false;
	public triggerStart(): void {
		this.start();
	}
	private start(): void {
		this._dynamicObjects.forEach((dynamicObject) => {
			dynamicObject.onStart(BridgeH.getCurrentITimeMomentFrom_GEGameTime());
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
				dynamicObject.onFrameUpdate(BridgeH.getCurrentITimeMomentFrom_GEGameTime());
			}
		});

		// console.log(
		// 	`Game updated "${GE.GameTime.currentFrame}", current time "${GE.GameTime.realTimeSinceStartup}", delta time "${GE.GameTime.deltaTime}"`
		// );

		requestAnimationFrame(() => this.update()); // Continue the loop
	}
}
