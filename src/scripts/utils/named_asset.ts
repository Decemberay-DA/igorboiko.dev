/**
 * i might use gltf instance data instead but
 */
export default class named_asset {
	public readonly name: string;
	public readonly id: number;
	public readonly suffixes: Array<string>;

	/**
	 * Breaks name by '_' sign. Example:
	 * BunchOfGrass_156_BIG_ADRESSABLE_DISPOSABLE
	 * name: "BunchOfGrass"
	 * id: "156"
	 * suffixes: {"BIG", "ADRESSABLE", "DISPOSABLE"}
	 */
	public static traverseName(name: string): named_asset {
		const parts = name.split("_");

		const assetName = parts[0];
		const assetId = parseInt(parts[1], 10);
		const assetSuffixes = parts.slice(2);

		return new named_asset(assetName, assetId, assetSuffixes);
	}

	public isContainsSuffix(suffix: string): boolean {
		return this.suffixes.includes(suffix);
	}

	constructor(name: string, id: number, suffixes: Array<string>) {
		this.name = name;
		this.id = id;
		this.suffixes = suffixes;
	}
}
