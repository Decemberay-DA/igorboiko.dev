import type { IDinamicObject } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObject";
import { GE, OnFrameUpdateOrders } from "..";
import { BridgeH } from "../_bridge/Bridge";
import type { ITimeMoment } from "@/scripts/GameEngineFunctional/ADTs/ITimeMoment/ITimeMoment";
import type { IEnableable } from "@/scripts/GameEngineFunctional/ADTs/IEnableable/IEnableable";
import type { IDinamicUpdate } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdate";
import type { IURI } from "@/scripts/GameEngineFunctional/ADTs/_IURI/IURI";
import type { IDinamicUpdates } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdates";
import type { IRootGame } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectB";
import { ITimeMomentB } from "@/scripts/GameEngineFunctional/ADTs/ITimeMoment/ITimeMomentB";

/**
 * objectian game
 */
// export class oopGame implements IURI & IDinamicUpdates & IDinamicObject & IRootGame {
export class oopGame implements IURI, IEnableable, IDinamicUpdate, IDinamicUpdates, IRootGame {
	_uri = ["oopGame"];
	isEnabled: boolean = true;
	readonly startedAt = performance.now();
	rootTime = ITimeMomentB.newPerformanceNow();

	// DynamicObject registration ========-====-====-====-============

	participants: IDinamicObject[] = [];
	public get dynamicObjects(): Readonly<Array<IDinamicObject>> {
		return Object.freeze([...this.participants]);
	}
	public async registerDinamicObject(dynamicObject: IDinamicObject): Promise<void> {
		this.participants.push(dynamicObject);
		this.participants.sort((a, b) => a.onFrameUpdateOrder - b.onFrameUpdateOrder);
	}
	public async unRegisterDinamicObject(dynamicObject: IDinamicObject): Promise<void> {
		const index = this.participants.indexOf(dynamicObject);
		if (index > -1) {
			this.participants.splice(index, 1);
		}
	}

	// Game loop ========-====-====-====-============
	onFrameUpdateOrder = OnFrameUpdateOrders.MID_FRAME_UPDATE;
	_isStarted = false;
	_isDeleted = false;
	public onStart(): void {
		this._isStarted = true;
		this.participants.forEach((dynamicObject) => {
			dynamicObject.onStart(BridgeH.getCurrentITimeMomentFrom_GEGameTime());
		});
		// this._isStarted = true;
		this.onFrameUpdate();
	}
	public onFrameUpdate(): void {
		if (!this.isEnabled) return;
		this.rootTime = BridgeH.getCurrentITimeMomentFrom_GEGameTime();

		this.participants.forEach((dynamicObject) => {
			if (dynamicObject.isEnabled) {
				dynamicObject.onFrameUpdate(this.rootTime);
			}
		});

		requestAnimationFrame(() => this.onFrameUpdate()); // Continue the loop
	}
	public onDelete = (time: ITimeMoment) => {
		this.participants.forEach((dynamicObject) => {
			dynamicObject.onDelete(this.rootTime);
		});
		this._isDeleted = true;
	};
}
