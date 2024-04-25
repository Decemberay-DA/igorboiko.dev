import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import { TWEEN } from "@/scripts/FrameworksExport";
import { GE } from "@/scripts/GameEngine";
import ColorH from "@/scripts/styles/ColorH";
import TailwindH from "@/scripts/styles/TailwindH";
import TailwindMirrorH from "@/scripts/styles/TailwindMirrorH";
import { Tween } from "@tweenjs/tween.js";
import type ETAnyInterractionOccured from "../Events/ETAnyInterractionOccured";
import { flow, pipe } from "fp-ts/lib/function";

/**
 *
 */
export default class EHTailwindStyleFlick implements INotificationHandler<ETAnyInterractionOccured> {
	async handle(notification: ETAnyInterractionOccured): Promise<void> {
		const startColor = TailwindH.getColorToken(TailwindMirrorH.colorTokens.GACTIVERIGHT.name);
		const endColor = TailwindH.getColorToken(TailwindMirrorH.colorTokens.GACTIVELEFT.name);

		const toBool = (val: number): number => {
			return val > 0.5 ? 1 : 0;
		};

		const tween = new Tween(startColor) //
			.to(endColor, 3024)
			// .easing(TWEEN.Easing.Exponential.Out)
			.easing(
				flow(
					TWEEN.Easing.Exponential.In,
					TWEEN.Easing.Exponential.Out,
					(x) => x * 100,
					(x) => x % 1,
					(x) => Math.sin(x)
					// toBool
				)
			)
			.onUpdate((data) => {
				document.documentElement.style.setProperty(
					TailwindH.TWVariableName_To_CSSVariableName(TailwindMirrorH.colorTokens.GACTIVE.name),
					ColorH.IRGB_to_CSSRGBAString(data)
				);
			});

		const coroutine = GE.Coroutine.newFromTween(tween);

		return Promise.resolve();
	}
}
