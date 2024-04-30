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
import { pipe } from "fp-ts/lib/function";
import { IDinamicUpdatesB } from "../IDinamicUpdates/IDinamicUpdatesB";
import { MixinB } from "../Utils/MixinB";
import { IDB } from "../ID.ts/IDB";
import { URIB } from "../_IURI/URIB";
import { pointed } from "fp-ts";

export interface IRootGame {
	readonly startedAt: number;
	rootTime: ITimeMoment;
}

/**
 *
 */
export class IDinamicObjectB {
	/**
	 * @returns root top dinamic object that is updating itself
	 */
	static newRootSelfUpdating = <A extends IDinamicUpdate>(
		updateability: A
	): A & IDinamicObject & IRootGame => {
		let _isStarted = false;
		let _killSignal = () => false;

		const _currentRelativeTime = () => performance.now() - rootObject.startedAt;
		const _updateRootTime = (currentFrame: number): ITimeMoment =>
			(rootObject.rootTime = {
				...ITimeMomentB.current(rootObject.rootTime)(_currentRelativeTime()),
				frame: currentFrame,
			});

		const rootObject = pipe(
			updateability,
			IDinamicUpdateB.newMixedIn({
				// wrapped to also controll the loop
				onStart(time) {
					updateability.onStart(time);
					_isStarted = true;
				},
				onFrameUpdate(time) {
					updateability.onFrameUpdate(time);
				},
				onDelete(time) {
					updateability.onDelete(time);
					_killSignal = () => true;
				},
			}),
			IDinamicObjectB.new,
			MixinB.newWith<IRootGame>({
				startedAt: performance.now(),
				rootTime: ITimeMomentB.newPerformanceNow(),
			})
		);

		const _onLoopUpdate = (loopDataBag: ILoopDataBag) => {
			if (!_isStarted) {
				if (rootObject.isEnabled === false) return; // start only when object enabled

				// console.log("started in LOOP");

				_updateRootTime(loopDataBag.frame);
				IDinamicObjectH.start(rootObject.rootTime)(rootObject);
			}

			_updateRootTime(loopDataBag.frame);
			IDinamicObjectH.frameUpdate(rootObject.rootTime)(rootObject);
			// console.log("UPDATED in LOooOP");
		};

		const loop = ILoopB.newLoopBehaviour(_killSignal)(() => rootObject.isEnabled)(_onLoopUpdate);
		loop();

		return rootObject;
	};

	static new = <A extends IDinamicUpdate>(updateability: A): A & IDinamicObject => {
		return {
			...updateability,
			...IEnableableB.enabled(),
		};
	};
}
