import asi from "@/scripts/asi/asi";
import type { IDinamicObject } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObject";
import { OnFrameUpdateOrders } from "../oopGame";
import { IDinamicUpdatesH } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdatesH";
import type { IParented } from "@/scripts/GameEngineFunctional/ADTs/IParented/IParented";
import type { ITopLevelGame } from "@/scripts/GameEngineFunctional/Types/ITopLevelGameB";
import { option } from "fp-ts";

/**
 * it is a class based on functional ADTs
 */
export abstract class ADynamicObject implements IDinamicObject, IParented<ITopLevelGame> {
	public parent = option.none;
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
		IDinamicUpdatesH.insertAndParent(asi.game.root.self)(this);
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
		IDinamicUpdatesH.removeAndUnParentFromasiRootGame(this);
		this._isDeleted = true;
	}
}
