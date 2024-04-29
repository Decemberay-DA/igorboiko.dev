import type { LazyArg } from "fp-ts/lib/function";

export class ILoopB {
	static newLoopBehaviour =
		(killSignal: LazyArg<boolean>) =>
		(isDoLoop: LazyArg<boolean>) =>
		(everyFrameUpdate: () => void): (() => void) => {
			let count = 0;
			const loop = () => {
				if (killSignal()) return;

				if (isDoLoop()) {
					everyFrameUpdate();
					console.log("was lopped: " + count);
					count++;
				}

				requestAnimationFrame(() => loop());
			};
			return loop;
		};
}
