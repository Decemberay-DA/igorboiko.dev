import { array } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

/**
 *
 */
export class PromisseH {
	/**
	 * starts all promisses at the same time without waiting for their completition
	 */
	static runSimultaneously = (promises: Promise<void>[]) =>
		pipe(
			promises, //
			array.map((p) => p.then().catch())
		);
}
