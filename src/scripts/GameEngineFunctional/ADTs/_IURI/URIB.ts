import { URICommonOnes, type URI } from "./URI";

/**
 *
 */
export class URIB {
	static new = (uris: string[]): URI => ({ _uri: uris });

	static newImprinted =
		(uriToimprint: string) =>
		<A>(obj: A): URI & A => ({
			...obj,
			_uri: [...(obj as URI)._uri, uriToimprint],
		});

	static newErrazed =
		(uriToErraze: string) =>
		<A>(obj: A): URI & A => {
			const newURIList = (obj as URI)._uri.filter((u) => u !== uriToErraze);

			if (newURIList.length === 0) {
				return {
					...obj,
					_uri: [URICommonOnes.NoURI],
				};
			} else {
				return {
					...obj,
					_uri: newURIList,
				};
			}
		};
}
