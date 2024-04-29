import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";
import { IDinamicUpdateB } from "../IDinamicUpdate/IDinamicUpdateB";
import type { IEnableable } from "../IEnableable/IEnableable";
import { IEnableableB } from "../IEnableable/IEnableableB";
import { IEnableableH } from "../IEnableable/IEnableableH";
import { ILoopB, type ILoopDataBag } from "../ILoop/ILoopB";
import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";
import { ITimeMomentB } from "../ITimeMoment/ITimeMomentB";
import type { IDinamicObject } from "./IDinamicObject";
import { IDinamicObjectH } from "./IDinamicObjectH";
import { OnFrameUpdatePriorities } from "../../../GameEngine/Game/OnFrameUpdatePriorities";

export interface IRootGame {
	readonly startedAt: number;
	rootTime: ITimeMoment;
}

/**
 *
 */
export class IDinamicObjectB {
	// /**
	//  * @returns root top dinamic object that is updating itself
	//  */
	static newRoot = <A extends IDinamicUpdate>(updateability: A): A & IDinamicObject & IRootGame => {
		const IRootGameData: IRootGame = {
			startedAt: performance.now(),
			rootTime: ITimeMomentB.new(0),
		};
		let _isStarted = false;
		let _killSignal = () => false;

		const _currentRelativeTime = () => performance.now() - IRootGameData.startedAt;
		const _updateRootTime = (currentFrame: number) =>
			(IRootGameData.rootTime = {
				...ITimeMomentB.current(IRootGameData.rootTime)(_currentRelativeTime()),
				frame: currentFrame,
			});

		const rootupdateability = IDinamicUpdateB.new({
			...updateability,
			onStart(time) {
				updateability.onStart(time);
				_isStarted = true;
			},
			onFrameUpdateOrder: updateability.onFrameUpdateOrder,
			onFrameUpdate(time) {
				updateability.onFrameUpdate(time);
			},
			onDelete(time) {
				updateability.onDelete(time);
				_killSignal = () => true;
			},
		});
		// yo this mixing is crazy omg
		const rootObject: A & IEnableable & IRootGame = {
			...updateability,
			...IRootGameData,
			...rootupdateability,
			...IEnableableB.enabled(),
		};

		const _onLoopUpdate = (loopDataBag: ILoopDataBag) => {
			if (!_isStarted) {
				if (rootObject.isEnabled === false) return; // start only when object enabled

				// console.log("started in LOOP");

				_updateRootTime(loopDataBag.frame);
				IDinamicObjectH.start(IRootGameData.rootTime)(rootObject);
			}

			_updateRootTime(loopDataBag.frame);
			IDinamicObjectH.frameUpdate(IRootGameData.rootTime)(rootObject);
			// console.log("UPDATED in LOOP");
		};

		const loop = ILoopB.newLoopBehaviour(_killSignal)(() => rootObject.isEnabled)(_onLoopUpdate);
		loop();

		return rootObject;
	};

	static newFromIDinamicUpdate = <A extends IDinamicUpdate>(updateability: A): A & IDinamicObject => {
		return {
			...updateability,
			...IEnableableB.enabled(),
		};
	};
}
