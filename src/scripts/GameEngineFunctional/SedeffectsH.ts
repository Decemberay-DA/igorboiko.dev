import type { Predicate } from "fp-ts/lib/Predicate";

/**
 *
 */
export class SedeffectsH {
	/**
	 * broken genericks btw idk why
	 */
	static readonly doIf =
		<A>(doThisIfTrue: (obj: A) => void) =>
		(predicate: (obj: A) => boolean) =>
		(target: A): A => {
			if (predicate(target)) doThisIfTrue(target);
			return target;
		};
}
