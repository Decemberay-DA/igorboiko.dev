import type { URI } from "./URI";

/**
 *
 */
export class URIH {
	static isEquals =
		(a: URI) =>
		(b: URI): boolean =>
			a._uri === b._uri;

	static isContains =
		(a: string) =>
		(obj: URI): boolean =>
			obj._uri.includes(a);
}
