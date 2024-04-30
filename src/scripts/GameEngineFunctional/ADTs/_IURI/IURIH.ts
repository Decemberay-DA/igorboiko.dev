import type { IURI } from "./IURI";

/**
 *
 */
export class IURIH {
	static isEquals =
		(a: IURI) =>
		(b: IURI): boolean =>
			a._uri === b._uri;

	static isContains =
		(a: string) =>
		(obj: IURI): boolean =>
			obj._uri.includes(a);
}
