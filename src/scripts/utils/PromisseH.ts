import { array } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

/**
 *
 */
export class PromisseH {
	/**
	 * starts all promisses at the same time without waiting for their completition
	 */
	static readonly runSimultaneously = (promises: Promise<void>[]) =>
		pipe(
			promises, //
			array.map((p) => p.then().catch())
		);
	static readonly chainArray = <T>(...chain: Promise<T>[]): Promise<T> =>
		pipe(
			chain, //
			array.reduce(new Promise<T>(() => {}), (acc, p) => acc.then(() => p))
		);
}
