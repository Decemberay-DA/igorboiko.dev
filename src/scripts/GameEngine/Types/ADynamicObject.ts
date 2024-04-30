import asi from "@/scripts/asi/asi";
import type { IDinamicObject } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObject";
import { OnFrameUpdateOrders } from "../oopGame";

/**
 * it is a class based on functional ADTs
 */
export abstract class ADynamicObject implements IDinamicObject {
	protected _isEnabled: boolean = true; // is this object should be updated
	public get isEnabled(): boolean {
		return this._isEnabled;
	}
	public enable(): void {
		this._isEnabled = true;
		console.log("DynamicObject '" + this.constructor.name + "' enabled.");
	}
	public disable(): void {
		this._isEnabled = false;
		console.log("DynamicObject '" + this.constructor.name + "' disabled.");
	}

	public isRegistersItSelfInOOPGame = true;
	protected constructor() {
		if (this.isRegistersItSelfInOOPGame) asi.game.oopgame.registerDinamicObject(this);
		console.log("DynamicObject '" + this.constructor.name + "' created.");
	}

	_isStarted = false;
	public onStart(): void {
		this._isStarted = true;
		return;
	}

	// define the order in which dynamick objects are sorted and updated
	public onFrameUpdateOrder: number = OnFrameUpdateOrders.MID_FRAME_UPDATE;
	public onFrameUpdate(): void {
		return;
	}
	public onDelete(): void {
		return;
	}

	public _isDeleted = false;
	public delete(): void {
		this.onDelete();
		if (this.isRegistersItSelfInOOPGame) asi.game.oopgame.unRegisterDinamicObject(this); // Unregister this object from the Game instance
		this._isDeleted = true;
	}
}
