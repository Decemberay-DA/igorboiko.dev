import asi from "@/scripts/asi/asi";
import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import DOMSearcherH from "@/scripts/VueTSHelpers/DOMSearcherH";
import { Tween, Easing } from "@tweenjs/tween.js";
import NCurtainsOpened from "../Events/NCurtainsOpened";
import NThreeSceneLoaded from "../Events/NThreeSceneLoaded";

export default class EHCurtainsOpener_on_NThreeSceneLoaded
	implements INotificationHandler<NThreeSceneLoaded>
{
	// private _coroutine!: Coroutine<CSSStyleDeclaration>;

	public async handle(notification: NThreeSceneLoaded): Promise<void> {
		// const curtains = DOMSearcherH.getElementById("__LoadCurtain__");

		// if (this._coroutine.tween.isPlaying()) {
		// 	this._coroutine.tween.stop();
		// }

		// const newTween = new Tween(curtains.style)
		// 	.to({ opacity: 0 }, 3000) //
		// 	.easing(Easing.Quadratic.Out);

		// this._coroutine = Coroutine.newFromTween(newTween, () => {
		// 	asi.mediator.publish(new NCurtainsOpened());
		// });

		return Promise.resolve();
	}
}
