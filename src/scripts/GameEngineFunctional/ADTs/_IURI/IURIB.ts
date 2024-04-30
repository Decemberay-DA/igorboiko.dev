import { IURICommonOnes, type IURI } from "./IURI";

/**
 *
 */
export class IURIB {
	static new = (...uris: string[]): IURI => ({ _uri: uris });

	static newImprinted =
		(uriToimprint: string) =>
		<A>(obj: A): IURI & A => ({
			...obj,
			_uri: [...((obj as IURI)._uri || []), uriToimprint],
		});

	static newErrazed =
		(uriToErraze: string) =>
		<A>(obj: A): IURI & A => {
			const newURIList = (obj as IURI)._uri.filter((u) => u !== uriToErraze);

			if (newURIList.length === 0) {
				return {
					...obj,
					_uri: [IURICommonOnes.NoURI],
				};
			} else {
				return {
					...obj,
					_uri: newURIList,
				};
			}
		};
}
