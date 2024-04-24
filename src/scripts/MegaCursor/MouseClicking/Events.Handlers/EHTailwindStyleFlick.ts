import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import type ETAnyInterractionOccured from "../Events/ETAnyInterractionOccured";
import { number, option } from "fp-ts";
import type { Tween } from "@tweenjs/tween.js";
import { TWEEN } from "@/scripts/FrameworksExport";
import { GE } from "@/scripts/GameEngine";
import { THREE } from "@/scripts/ThreeJS";
import { lerp } from "three/src/math/MathUtils.js";
import SmoothLerper from "@/scripts/CameraManagiment/Lerper";
import ColorH from "../../../styles/ColorH";
import CSSH from "../../../styles/CSSSH";
import TailwindH from "@/scripts/styles/TailwindH";

/**
 *
 */
export default class EHTailwindStyleFlick
	extends GE.ADynamicObject
	implements INotificationHandler<ETAnyInterractionOccured>
{
	private _tween: option.Option<Tween<any>> = option.none;

	public constructor() {
		super();
	}

	public override onFrameUpdate(): void {
		if (option.isSome(this._tween)) {
			this._tween.value.update(performance.now());
		}
	}

	async handle(notification: ETAnyInterractionOccured): Promise<void> {
		this.startTheFlick();
		return Promise.resolve();
	}

	private _isBool = false;
	private startTheFlick() {
		const startColor = CSSH.newRGBFromTWVariable("GACTIVERIGHT");
		const endColor = CSSH.newRGBFromTWVariable("GACTIVELEFT");

		if (option.isSome(this._tween)) this._tween.value.stop();

		console.log(CSSH.listCssColorVariables());

		if (this._isBool) {
			document.documentElement.style.setProperty(
				TailwindH.TWVariableNameToCSSVariableName("GACTIVE"),
				ColorH.RGBToCSSRGBAString(startColor)
			);
			this._isBool = !this._isBool;
		} else {
			document.documentElement.style.setProperty(
				TailwindH.TWVariableNameToCSSVariableName("GACTIVE"),
				ColorH.RGBToCSSRGBAString(new THREE.Color(0, 0, 1))
			);
			this._isBool = !this._isBool;
		}
		// this._tween = option.some(
		// 	new TWEEN.Tween({ lerp: 0 })
		// 		.to({ lerp: 1 }, 3025)
		// 		.easing(TWEEN.Easing.Exponential.Out)
		// 		.onUpdate((data) => {
		// 			document.documentElement.style.setProperty(
		// 				TailwindH.TWVariableNameToCSSVariableName("GACTIVE"),
		// 				ColorH.threeColorToCSSRGBA(
		// 					SmoothLerper.instance.Color(startColor, endColor, data.lerp)
		// 				)
		// 			);
		// 		})
		// 		.start()
		// );
	}
}
