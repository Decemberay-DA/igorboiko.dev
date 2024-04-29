import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate/IDinamicUpdate";
import { IDinamicUpdateB } from "../IDinamicUpdate/IDinamicUpdate/IDinamicUpdateB";
import type { IEnableable } from "../IEnableable/IEnableable";
import { IEnableableB } from "../IEnableable/IEnableableB";
import { IEnableableH } from "../IEnableable/IEnableableH";
import { ILoopB } from "../ILoop/ILoop";
import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";
import { ITimeMomentB } from "../ITimeMoment/ITimeMomentB";
import type { IDinamicObject } from "./IDinamicObject";
import { IDinamicObjectH } from "./IDinamicObjectH";

export interface IRootGame {
	readonly startedAt: number;
	rootTime: ITimeMoment;
	isStarted: boolean;
}

/**
 *
 */
export class IDinamicObjectB {
	// /**
	//  * @returns root top dinamic object that is updating itself
	//  * TODO -> i need ID here actually very much
	//  */
	// static newRoot = (updateability: IDinamicUpdate): IDinamicObject & IRootGame => {
	// 	const data: IRootGame = {
	// 		startedAt: performance.now(),
	// 		rootTime: ITimeMomentB.new(0),
	// 		isStarted: false,
	// 		isLooping: true,
	// 	};

	// 	const currentTime = () => performance.now() - data.startedAt;
	// 	const updateRootTime = () => (data.rootTime = ITimeMomentB.current(data.rootTime)(currentTime()));

	// 	const rootupdateability = IDinamicUpdateB.new({
	// 		...updateability,
	// 		onDelete(time) {
	// 			updateability.onDelete(time);
	// 			data.isLooping = false; // exit loop when deleted
	// 		},
	// 	});
	// 	const rootObject: IDinamicObject & IRootGame = {
	// 		...data,
	// 		...rootupdateability,
	// 		...IEnableableB.enabled(),
	// 	};

	// 	const loop = () => {
	// 		if (!data.isStarted) {
	// 			if (rootObject.isEnabled === false) return; // start only when object enabled

	// 			updateRootTime();
	// 			IDinamicObjectH.start(data.rootTime)(rootObject);
	// 			data.isStarted = true;
	// 		}
	// 		if (!data.isLooping) return; // exit loop

	// 		updateRootTime();
	// 		IDinamicObjectH.frameUpdate(data.rootTime)(rootObject);

	// 		requestAnimationFrame(() => loop());
	// 	};

	// 	// starting the loop
	// 	loop();

	// 	return rootObject;
	// };
	static newRoot = (updateability: IDinamicUpdate): IDinamicObject & IRootGame => {
		const data: IRootGame = {
			startedAt: performance.now(),
			rootTime: ITimeMomentB.new(0),
			isStarted: false,
		};
		let killSignal = () => false;

		const currentTime = () => performance.now() - data.startedAt;
		const updateRootTime = () => (data.rootTime = ITimeMomentB.current(data.rootTime)(currentTime()));

		const rootupdateability = IDinamicUpdateB.new({
			...updateability,
			onDelete(time) {
				updateability.onDelete(time);
				killSignal = () => true;
			},
		});
		const rootObject: IDinamicObject & IRootGame = {
			...data,
			...rootupdateability,
			...IEnableableB.enabled(),
		};

		const onLoopUpdate = () => {
			if (!data.isStarted) {
				if (rootObject.isEnabled === false) return; // start only when object enabled

				// console.log("started in LOOP");

				updateRootTime();
				IDinamicObjectH.start(data.rootTime)(rootObject);
				data.isStarted = true;
			}

			updateRootTime();
			IDinamicObjectH.frameUpdate(data.rootTime)(rootObject);
			// console.log("UPDATED in LOOP");
		};

		const loop = ILoopB.newLoopBehaviour(killSignal)(() => rootObject.isEnabled)(onLoopUpdate);
		loop();

		return rootObject;
	};
}
