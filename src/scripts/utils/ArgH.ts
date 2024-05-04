import { tupled, untupled } from "fp-ts/lib/function";

/**
 * moves arguments of a function around and over.
 * Phonetick prononciation repherence: https://youtu.be/fpSw3gwdF5c?t=100
 */
export class ArgH {
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
	static readonly curryFirstAsLast3 = <A, B, C, O>(fn: (a: A, b: B, c: C) => O) => {
		return (b: B, c: C) => (a: A) => fn(a, b, c);
	};
	/**
	 * takes a ragument and swaps it with b
	 */
	static readonly ab_ = <A, B, C, O>(fn: (a: A) => (b: B) => (c: C) => O) => {
		return (b: B) => (a: A) => (c: C) => fn(a)(b)(c);
	};
	static readonly a_b = <A, B, C, O>(fn: (a: A) => (b: B) => (c: C) => O) => {
		return (c: C) => (b: B) => (a: A) => fn(a)(b)(c);
	};
	static readonly ba_ = <A, B, C, O>(fn: (a: A) => (b: B) => (c: C) => O) => {
		return (b: B) => (a: A) => (c: C) => fn(a)(b)(c);
	};
	static readonly _ab = <A, B, C, O>(fn: (a: A) => (b: B) => (c: C) => O) => {
		return (a: A) => (c: C) => (b: B) => fn(a)(b)(c);
	};
	static readonly b_a = <A, B, C, O>(fn: (a: A) => (b: B) => (c: C) => O) => {
		return (c: C) => (b: B) => (a: A) => fn(a)(b)(c);
	};
	static readonly _ba = <A, B, C, O>(fn: (a: A) => (b: B) => (c: C) => O) => {
		return (a: A) => (c: C) => (b: B) => fn(a)(b)(c);
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
	static readonly curryFirstAsLast4 = <A, B, C, D, O>(fn: (a: A, b: B, c: C, d: D) => O) => {
		return (b: B, c: C, d: D) => (a: A) => fn(a, b, c, d);
	};
}
