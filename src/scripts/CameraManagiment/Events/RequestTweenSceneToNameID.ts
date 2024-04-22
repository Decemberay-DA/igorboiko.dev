import type { INotification } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import WasRequestedTweenSceneToAny from "./WasRequestedTweenSceneToAny";

export default class RequestTweenToSceneByNameID
	extends WasRequestedTweenSceneToAny
	implements INotification
{
	public readonly nameID: string;

	constructor(nameID: string) {
		super();

		this.nameID = nameID;
	}
}
