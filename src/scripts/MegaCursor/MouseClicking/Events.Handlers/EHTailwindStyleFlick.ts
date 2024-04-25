import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import { TWEEN } from "@/scripts/FrameworksExport";
import { GE } from "@/scripts/GameEngine";
import ColorH from "@/scripts/styles/ColorH";
import TailwindH from "@/scripts/styles/TailwindH";
import TailwindMirrorH from "@/scripts/styles/TailwindMirrorH";
import { Tween } from "@tweenjs/tween.js";
import type ETAnyInterractionOccured from "../Events/ETAnyInterractionOccured";
import type { IRGB } from "@/scripts/utils/IRGB";

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
					ColorH.IRGB_to_CSSRGBAString(params)
				);
			});

		const coroutine = GE.Coroutine.newFromTween(tween);

		return Promise.resolve();
	}
}
