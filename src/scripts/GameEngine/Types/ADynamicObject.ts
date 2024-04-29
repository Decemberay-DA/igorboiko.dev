import { GE, type __oop_localDinamicObject } from "..";

/**
 * it is a class based on functional ADTs
 */
export abstract class ADynamicObject implements __oop_localDinamicObject {
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
		if (this.isRegistersItSelfInOOPGame) GE.Game.getInstance().registerDinamicObject(this);
		console.log("DynamicObject '" + this.constructor.name + "' created.");
	}

	public onStart(): void {
		return;
	}

	// define the order in which dynamick objects are sorted and updated
	public onFrameUpdateOrder: number = GE.OnFrameUpdatePriorities.MID_FRAME_UPDATE;
	public onFrameUpdate(): void {
		return;
	}
	public onDelete(): void {
		return;
	}

	public _isDeleted = false;
	public delete(): void {
		this.onDelete();
		if (this.isRegistersItSelfInOOPGame) GE.Game.getInstance().unRegisterDinamicObject(this); // Unregister this object from the Game instance
		this._isDeleted = true;
	}
}
