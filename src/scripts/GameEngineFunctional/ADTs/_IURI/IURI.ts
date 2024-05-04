/**
 * a type guard system like in fp-ts which i dont cnow anithing about
 * Used for pattern matching.
 * used like interface for every ADT not for instantiating
 */
export interface IURI<U> {
	readonly _uri: U;
}

export const isEquals = <U>(a: IURI<U>, b: IURI<U>): boolean => a._uri === b._uri;
