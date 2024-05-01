import randomH from "@/scripts/utils/randomH";
import { pipe } from "fp-ts/lib/function";
import { mathH } from "../../../utils/mathH";
import { option } from "fp-ts";

/**
 *
 */
export type UUID = string;

/**
 *
 */
export class UUIDB {
	static readonly fromSeed = (seed: any): UUID => {
		return pipe(
			+seed, // here is the error btw i think
			option.fromNullable,
			option.match(
				() => undefined,
				(x) => x
			),
			randomH.float0to1,
			mathH.lerpc(Number.MIN_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER),
			toString
		);
	};
	static readonly random = (): UUID => {
		return pipe(
			randomH.float0to1(), //
			mathH.lerpc(Number.MIN_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER),
			toString
		);
	};
}
