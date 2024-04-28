import type { IDinamicObject } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObject";
import { GE } from "..";

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

	protected constructor() {
		GE.Game.getInstance().registerDinamicObject(this);
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

	private _isDeleted = false;
	public get isDeleted() {
		return this._isDeleted;
	}
	public delete(): void {
		this.onDelete();
		GE.Game.getInstance().unRegisterDinamicObject(this); // Unregister this object from the Game instance
		this._isDeleted = true;
	}
}
