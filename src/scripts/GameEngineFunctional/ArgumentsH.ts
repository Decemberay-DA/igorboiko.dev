/**
 *
 */
export class ArgumentsH {
	/**
	 * from (to: TTimeEncoding) => (value: number) => number
	 * to   (value: number) => (to: TTimeEncoding) => number
	 */
	static readonly flip = <AArg, BArg, CRes>(fn: (a: AArg) => (b: BArg) => CRes) => {
		return (b: BArg) => (a: AArg) => fn(a)(b);
	};
}
