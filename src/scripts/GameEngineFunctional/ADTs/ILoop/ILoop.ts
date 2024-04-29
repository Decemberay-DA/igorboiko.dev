import type { LazyArg } from "fp-ts/lib/function";

export interface ILoopDataBag {
	frame: number;
}

export class ILoopB {
	static newLoopBehaviour =
		(killSignal: LazyArg<boolean>) =>
		(isDoLoop: LazyArg<boolean>) =>
		(everyFrameUpdate: (loopDataBag: ILoopDataBag) => void): (() => void) => {
			let count = 0;
			const loop = () => {
				if (killSignal()) return;

				if (isDoLoop()) {
					everyFrameUpdate({
						frame: count,
					});
					// console.log("LoopBehaviour: lopped: " + count);
					count++;
				}

				requestAnimationFrame(() => loop());
			};
			return loop;
		};
}
