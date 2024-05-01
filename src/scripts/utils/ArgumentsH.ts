import { mathH } from "./mathH";

/**
 * moves arguments aroud and over
 */
export class ArgumentsH {
	/**
	 *
	 */
	static readonly loin2 = <A, B, O>(fn: (a: A) => (b: B) => O) => {
		return (a: A, b: B) => fn(a)(b);
	};
	static readonly curry2 = <A, B, O>(fn: (a: A, b: B) => O) => {
		return (b: B) => (a: A) => fn(a, b);
	};
	/**
	 * swaps two arguments
	 */
	static readonly flip = <A, B, O>(fn: (a: A) => (b: B) => O) => {
		return (b: B) => (a: A) => fn(a)(b);
	};

	/**
	 *
	 */
	static readonly loin3 = <A, B, C, O>(fn: (a: A) => (b: B) => (c: C) => O) => {
		return (a: A, b: B, c: C) => fn(a)(b)(c);
	};
	static readonly curry3 = <A, B, C, O>(fn: (a: A, b: B, c: C) => O) => {
		return (a: A) => (b: B) => (c: C) => fn(a, b, c);
	};
	/**
	 * swaps argument A with specified position
	 */
	static readonly Abc =
		<A, B, C, O>(swapToPosition: 2 | 3) =>
		(fn: (a: A) => (b: B) => (c: C) => O) => {
			return {
				2: (b: B) => (a: A) => (c: C) => fn(a)(b)(c),
				3: (c: C) => (b: B) => (a: A) => fn(a)(b)(c),
			}[swapToPosition];
		};
	/**
	 * swaps argument B with specified position
	 */
	static readonly aBc =
		<A, B, C, O>(swapToPosition: 1 | 3) =>
		(fn: (a: A) => (b: B) => (c: C) => O) => {
			return {
				1: (b: B) => (a: A) => (c: C) => fn(a)(b)(c),
				3: (a: A) => (c: C) => (b: B) => fn(a)(b)(c),
			}[swapToPosition];
		};
	/**
	 * swaps argument C with specified position
	 */
	static readonly abC =
		<A, B, C, O>(swapToPosition: 1 | 2) =>
		(fn: (a: A) => (b: B) => (c: C) => O) => {
			return {
				1: (c: C) => (b: B) => (a: A) => fn(a)(b)(c),
				2: (a: A) => (c: C) => (b: B) => fn(a)(b)(c),
			}[swapToPosition];
		};
}
