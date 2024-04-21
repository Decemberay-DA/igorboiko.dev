import type { INotification } from "mediatr-ts";
import WasRequestedTweenSceneToAny from "./WasRequestedTweenSceneToAny";

export default class RequestTweenToSceneByNameID extends WasRequestedTweenSceneToAny implements INotification {
	public readonly nameID: string;

	constructor(nameID: string) {
		super();

		this.nameID = nameID;
	}
}


