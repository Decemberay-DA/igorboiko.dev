import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import type ETAnyInterractionOccured from "../Events/ETAnyInterractionOccured";
import { number, option } from "fp-ts";
import type { Tween } from "@tweenjs/tween.js";
import { TWEEN } from "@/scripts/FrameworksExport";
import { GE } from "@/scripts/GameEngine";
import { THREE } from "@/scripts/ThreeJS";
import { lerp } from "three/src/math/MathUtils.js";
import SmoothLerper from "@/scripts/CameraManagiment/Lerper";

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

	private _isBool = false;
	async handle(notification: ETAnyInterractionOccured): Promise<void> {
		// const startColor = { color: "#ff0000" };
		// const endColor = { color: "#0000ff" };

		function hexToRgb(hex: string) {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result
				? {
						r: parseInt(result[1], 16) / 255,
						g: parseInt(result[2], 16) / 255,
						b: parseInt(result[3], 16) / 255,
				  }
				: null;
		}

		// const startColor = new THREE.Color(1, 0.5, 0.5);
		// const endColor = new THREE.Color(0, 1, 0.5);

		function getCssVariable(variableName: string): string {
			return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
		}

		function threeColorFromTailwindVariable(variableName: string) {
			const scv = getCssVariable(variableName);
			console.log("Color getCssVariable: " + JSON.stringify(scv));

			const sc = hexToRgb(scv) ?? { r: 1, g: 0, b: 1 };
			console.log("Color hexToRgb: " + JSON.stringify(sc));

			const startColor = new THREE.Color(sc.r, sc.g, sc.b);
			return startColor;
		}

		// try to sest this css variables in to css sheet so they are initedd
		const startColor = threeColorFromTailwindVariable("--tw-GACTIVERIGHT");
		const endColor = threeColorFromTailwindVariable("--tw-GACTIVELEFT");

		if (option.isSome(this._tween)) {
			this._tween.value.stop();
		}

		function threeColorToCSSRGBA(color: THREE.Color) {
			const r = Math.round(color.r * 255);
			const g = Math.round(color.g * 255);
			const b = Math.round(color.b * 255);
			return `rgba(${r}, ${g}, ${b}, ${1})`;
		}
		// const threeColorA = new THREE.Color().setHex("#FF3333");
		// const threeColorB = new THREE.Color("#00CCCC");
		// const threeColorA = new THREE.Color(1, 0.5, 0.5);
		// const threeColorB = new THREE.Color(0, 1, 0.5);

		function listCssColorVariables() {
			const styles = getComputedStyle(document.documentElement);

			for (let i = 0; i < styles.length; i++) {
				const propertyName = styles[i];
				if (propertyName.startsWith("--tw-G")) {
					const variableValue = getComputedStyle(document.documentElement)
						.getPropertyValue(propertyName)
						.trim();
					console.log(`${propertyName}: ${variableValue}`);
				}
			}
		}
		listCssColorVariables();

		// if (this._isBool) {
		// 	document.documentElement.style.setProperty("--tw-GACTIVE", threeColorToCSSRGBA(threeColorA));
		// 	this._isBool = !this._isBool;
		// } else {
		// 	document.documentElement.style.setProperty("--tw-GACTIVE", threeColorToCSSRGBA(threeColorB));
		// 	this._isBool = !this._isBool;
		// }
		this._tween = option.some(
			new TWEEN.Tween({ lerp: 0 })
				.to({ lerp: 1 }, 3025)
				// .interpolation(TWEEN.Interpolation.Bezier)
				.easing(TWEEN.Easing.Exponential.Out)
				.onUpdate((data) => {
					document.documentElement.style.setProperty(
						"--tw-GACTIVE",
						threeColorToCSSRGBA(SmoothLerper.instance.Color(startColor, endColor, data.lerp))
					);
				})
				.start()
		);

		return Promise.resolve();
	}
}