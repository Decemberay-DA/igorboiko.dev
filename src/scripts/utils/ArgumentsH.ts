import { tupled, untupled } from "fp-ts/lib/function";

/**
 * moves arguments aroud and over
 */
export class ArgumentsH {
	/**
	 * tuples
	 */
	static readonly tupled = tupled;
	static readonly untupled = untupled;

	/**
	 * 2 arguments
	 */
	static readonly join2 = <A, B, O>(fn: (a: A) => (b: B) => O) => {
		return (a: A, b: B) => fn(a)(b);
	};
	static readonly curry2 = <A, B, O>(fn: (a: A, b: B) => O) => {
		return (b: B) => (a: A) => fn(a, b);
	};
	static readonly flip = <A, B, O>(fn: (a: A) => (b: B) => O) => {
		return (b: B) => (a: A) => fn(a)(b);
	};

	/**
	 * 3 arguments
	 */
	static readonly join3 = <A, B, C, O>(fn: (a: A) => (b: B) => (c: C) => O) => {
		return (a: A, b: B, c: C) => fn(a)(b)(c);
	};
	static readonly curry3 = <A, B, C, O>(fn: (a: A, b: B, c: C) => O) => {
		return (a: A) => (b: B) => (c: C) => fn(a, b, c);
	};
	static readonly curryLast3 = <A, B, C, O>(fn: (a: A, b: B, c: C) => O) => {
		return (c: C, b: B) => (a: A) => fn(a, b, c);
	};

	/**
	 * 4 arguments
	 */
	static readonly join4 = <A, B, C, D, O>(fn: (a: A) => (b: B) => (c: C) => (d: D) => O) => {
		return (a: A, b: B, c: C, d: D) => fn(a)(b)(c)(d);
	};
	static readonly curry4 = <A, B, C, D, O>(fn: (a: A, b: B, c: C, d: D) => O) => {
		return (a: A) => (b: B) => (c: C) => (d: D) => fn(a, b, c, d);
	};
	static readonly curruLast4 = <A, B, C, D, O>(fn: (a: A, b: B, c: C, d: D) => O) => {
		return (d: D, c: C, b: B) => (a: A) => fn(a, b, c, d);
	};
}
