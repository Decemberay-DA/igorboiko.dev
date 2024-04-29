import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import { TWEEN } from "@/scripts/FrameworksExport";
import ColorEncodeH from "@/scripts/styles/ColorEncodeH";
import TailwindH from "@/scripts/styles/TailwindH";
import TailwindMirrorH from "@/scripts/styles/TailwindMirrorH";
import { Tween } from "@tweenjs/tween.js";
import type ETAnyInterractionOccured from "../Events/ETAnyInterractionOccured";
import { CoroutineB } from "@/scripts/GameEngineFunctional/Types/CoroutineB";

/**
 *
 */
export default class EHTailwindStyleFlick implements INotificationHandler<ETAnyInterractionOccured> {
	async handle(notification: ETAnyInterractionOccured): Promise<void> {
		const startColor = TailwindH.getColorToken(TailwindMirrorH.colors.GACTIVERIGHT.name);
		const endColor = TailwindH.getOriginalColorToken(TailwindMirrorH.colors.GACTIVE.name);

		// let accumulated = startColor;
		const tween = new Tween(startColor)
			.to(endColor, 1024)
			.easing(TWEEN.Easing.Exponential.Out)
			.onUpdate((params) => {
				document.documentElement.style.setProperty(
					TailwindH.TWVariableName_To_CSSVariableName(TailwindMirrorH.colors.GACTIVE.name),
					ColorEncodeH.IRGB_to_CSSRGBAString(params)
				);
			});

		// const coroutine = GE.Coroutine.newFromTween(tween);
		const coroutine = CoroutineB.newFromTweenAsGameRoot(tween);

		return Promise.resolve();
	}
}
