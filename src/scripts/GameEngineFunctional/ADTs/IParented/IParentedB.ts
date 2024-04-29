import type { IDinamicUpdates } from "../IDinamicUpdates/IDinamicUpdates";
import type { IParented } from "./IParented";

export class IParentedB {
	static readonly new = (parent: IDinamicUpdates): IParented => ({
		parent: parent,
	});
}
