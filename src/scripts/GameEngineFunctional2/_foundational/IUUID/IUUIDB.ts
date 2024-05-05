import { mathH } from "@/scripts/utils/mathH";
import randomH from "@/scripts/utils/randomH";
import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import type { IUUID } from "./IUUID";

export class IUUIDB {
	static readonly newFromSeed = (seed: any): IUUID => {
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

	static readonly newRandom = (): IUUID => {
		return pipe(
			randomH.float0to1(), //
			mathH.lerpc(Number.MIN_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER),
			toString
		);
	};
}
