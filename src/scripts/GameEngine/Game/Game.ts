import type { IDinamicObject } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObject";
import { GE } from "..";
import { BridgeH } from "../_bridge/Bridge";
import type { ITimeMoment } from "@/scripts/GameEngineFunctional/ADTs/ITimeMoment/ITimeMoment";

export type __oop_localDinamicObject = {
	isEnabled: boolean;
	readonly onFrameUpdateOrder: number;
	// _isStarted: boolean;
	readonly onStart: (time: ITimeMoment) => void;
	readonly onFrameUpdate: (time: ITimeMoment) => void;
	// _isDeleted: boolean;
	readonly onDelete: (time: ITimeMoment) => void;
};

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
	private _dynamicObjects: __oop_localDinamicObject[] = [];
	public get dynamicObjects(): Readonly<Array<__oop_localDinamicObject>> {
		return Object.freeze([...this._dynamicObjects]);
	}
	public async registerDinamicObject(dynamicObject: __oop_localDinamicObject): Promise<void> {
		this._dynamicObjects.push(dynamicObject);
		this._dynamicObjects.sort((a, b) => a.onFrameUpdateOrder - b.onFrameUpdateOrder);
	}
	public async unRegisterDinamicObject(dynamicObject: __oop_localDinamicObject): Promise<void> {
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
		if (!this.__isEnabled) return;

		this._dynamicObjects.forEach((dynamicObject) => {
			if (dynamicObject.isEnabled) {
				dynamicObject.onFrameUpdate(BridgeH.getCurrentITimeMomentFrom_GEGameTime());
			}
		});

		requestAnimationFrame(() => this.update()); // Continue the loop
	}
}
