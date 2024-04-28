import randomH from "@/scripts/utils/randomH";
import { pipe } from "fp-ts/lib/function";
import { mathH } from "../../../utils/math";
import { option } from "fp-ts";

/**
 *
 */
export type UUID = number;

/**
 *
 */
export class UUIDH {
	static readonly new = (seed: any = undefined): UUID => {
		return pipe(
			+seed, // here is the error btw i think
			option.fromNullable,
			option.match(
				() => undefined,
				(x) => x
			),
			randomH.float0to1,
			mathH.lerpc(Number.MIN_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER)
		);
	};
}
