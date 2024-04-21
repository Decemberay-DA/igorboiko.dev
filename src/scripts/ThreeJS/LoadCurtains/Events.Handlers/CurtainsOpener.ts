import { asi } from "@/scripts/asi/asi";
import DOMSearcherH from "@/scripts/VueTSHelper/DOMSearcherH";
import { Easing, Tween } from "@tweenjs/tween.js";
import { notificationHandler, requestHandler, type INotificationHandler } from "mediatr-ts";
import { ThreeSceneWasLoaded } from "../Events/ThreeSceneWasLoaded";
import { CurtainsOpened } from "../Events/CurtainsOpened";
import { option } from "fp-ts";
import { GE } from "@/scripts/GameEngine";

@notificationHandler(ThreeSceneWasLoaded)
export class CurtainsOpener extends GE.ADynamicObject implements INotificationHandler<ThreeSceneWasLoaded> {
	private currentTween: option.Option<Tween<CSSStyleDeclaration>> = option.none;

	public override onFrameUpdate(): void {
		if (option.isSome(this.currentTween)) {
			this.currentTween.value.update(performance.now());
		}
	}

	public async handle(notification: ThreeSceneWasLoaded): Promise<void> {
		const curtains = DOMSearcherH.getElementById("__LoadCurtain__");

		if (option.isSome(this.currentTween)) {
			if (this.currentTween.value.isPlaying()) {
				this.currentTween.value.stop();
			}
		}

		const newTween = new Tween(curtains.style)
			.to({ opacity: 0 }, 3000)
			.easing(Easing.Quadratic.Out)
			.onComplete(() => {
				asi.mediator.publish(new CurtainsOpened());
			})
			.start();
		this.currentTween = option.some(newTween);

		return Promise.resolve();
	}
}
