import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate/IDinamicUpdate";
import { IDinamicUpdateB } from "../IDinamicUpdate/IDinamicUpdate/IDinamicUpdateB";
import type { IEnableable } from "../IEnableable/IEnableable";
import { ITimeMomentB } from "../ITimeMoment/ITimeMomentB";
import type { IDinamicObject } from "./IDinamicObject";
import { IDinamicObjectH } from "./IDinamicObjectH";

/**
 *
 */
export class IDinamicObjectB {
	/**
	 * @returns root top dinamic object that is updating itself
	 * TODO -> i need ID here actually very much
	 */
	static newRoot =
		(updateability: IDinamicUpdate) =>
		(enableability: IEnableable): IDinamicObject => {
			let isStarted = false;
			let isLooping = true;

			const startedAt = performance.now();
			const currentTime = () => performance.now() - startedAt;
			const updateRootTime = () => (rootTime = ITimeMomentB.current(rootTime)(currentTime()));
			let rootTime = ITimeMomentB.new(0);
			const rootupdateability = IDinamicUpdateB.new({
				...updateability,
				onDelete(time) {
					updateability.onDelete(time);
					isLooping = false; // exit loop when deleted
				},
			});
			const rootObject: IDinamicObject = {
				...rootupdateability,
				...enableability,
			};

			const loop = () => {
				if (!isStarted) {
					if (rootObject.isEnabled === false) return; // start only when object enabled

					updateRootTime();
					IDinamicObjectH.start(rootTime)(rootObject);
					isStarted = true;
				}
				if (!isLooping) return; // exit loop

				updateRootTime();
				IDinamicObjectH.frameUpdate(rootTime)(rootObject);

				requestAnimationFrame(() => loop());
			};

			return rootObject;
		};
}
