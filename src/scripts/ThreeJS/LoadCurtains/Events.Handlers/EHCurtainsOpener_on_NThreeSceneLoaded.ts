import asi from "@/scripts/asi/asi";
import DOMSearcherH from "@/scripts/VueTSHelper/DOMSearcherH";
import { Easing, Tween } from "@tweenjs/tween.js";
import { notificationHandler, requestHandler, type INotificationHandler } from "mediatr-ts";
import NThreeSceneLoaded from "../Events/NThreeSceneLoaded";
import NCurtainsOpened from "../Events/NCurtainsOpened";
import { option } from "fp-ts";
import { GE } from "@/scripts/GameEngine";

@notificationHandler(NThreeSceneLoaded)
class EHCurtainsOpener_on_NThreeSceneLoaded
	extends GE.ADynamicObject
	implements INotificationHandler<NThreeSceneLoaded>
{
	private currentTween: option.Option<Tween<CSSStyleDeclaration>> = option.none;

	public override onFrameUpdate(): void {
		if (option.isSome(this.currentTween)) {
			this.currentTween.value.update(performance.now());
		}
	}

	public async handle(notification: NThreeSceneLoaded): Promise<void> {
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
				asi.mediator.publish(new NCurtainsOpened());
			})
			.start();
		this.currentTween = option.some(newTween);

		return Promise.resolve();
	}
}
