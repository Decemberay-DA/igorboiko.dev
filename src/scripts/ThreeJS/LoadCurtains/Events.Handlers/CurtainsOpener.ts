import { asi } from "@/scripts/asi/asi";
import DOMSearcherH from "@/scripts/VueTSHelper/DOMSearcherH";
import { Easing, Tween } from "@tweenjs/tween.js";
import { notificationHandler, requestHandler, type INotificationHandler } from "mediatr-ts";
import { ThreeSceneWasLoaded } from "../Events/ThreeSceneWasLoaded";
import { CurtainsOpened } from "../Events/CurtainsOpened";

@notificationHandler(ThreeSceneWasLoaded)
export class CurtainsOpener implements INotificationHandler<ThreeSceneWasLoaded> {
	public async handle(notification: ThreeSceneWasLoaded): Promise<void> {
		const curtains = DOMSearcherH.getElementById("__LoadCurtain__");

		const tween = new Tween(curtains.style)
			.to({ opacity: 0 }, 3000)
			.easing(Easing.Quadratic.Out)
			.onComplete(() => {
				asi.mediator.publish(new CurtainsOpened());
			})
			.start();

		return Promise.resolve();
	}
}
