import asi from "@/scripts/asi/asi.ts";
import { GE } from "@/scripts/GameEngine/index.ts";
import DOMSearcherH from "@/scripts/VueTSHelpers/DOMSearcherH.ts";
import { Tween, Easing } from "@tweenjs/tween.js";
import { option } from "fp-ts";
import NCurtainsOpened from "../Events/NCurtainsOpened.ts";
import type NThreeSceneLoaded from "../Events/NThreeSceneLoaded.ts";
import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator.ts";

export default class EHCurtainsOpener_on_NThreeSceneLoaded
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
