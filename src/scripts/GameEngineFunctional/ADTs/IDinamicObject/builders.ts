import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";
import { IDinamicUpdateB } from "../IDinamicUpdate/IDinamicUpdateB";
import { IEnableableB } from "../IEnableable/IEnableableB";
import { ILoopB, type ILoopDataBag } from "../ILoop/ILoopB";
import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";
import { ITimeMomentB } from "../ITimeMoment/ITimeMomentB";
import type { IDinamicObject } from "./typesBase";
import { pipe } from "fp-ts/lib/function";
import { MixinB } from "../Utils/MixinB";
import { dinamicObject, type IRootGame } from ".";

/**
 * @returns root top dinamic object that is updating itself
 */
export const newRootSelfUpdating = <A extends IDinamicUpdate>(
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
		IDinamicUpdateB.mixedIn({
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
		dinamicObject.create,
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
			dinamicObject.start(rootObject.rootTime)(rootObject);
		}

		_updateRootTime(loopDataBag.frame);
		dinamicObject.frameUpdate(rootObject.rootTime)(rootObject);
	};

	const loop = ILoopB.newLoopBehaviour(_killSignal)(() => rootObject.isEnabled)(_onLoopUpdate);
	loop();

	return rootObject;
};

export const create = <A extends IDinamicUpdate>(updateability: A): A & IDinamicObject => {
	return {
		...updateability,
		...IEnableableB.enabled(),
	};
};
