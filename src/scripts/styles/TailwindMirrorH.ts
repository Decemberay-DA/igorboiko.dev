import { option } from "fp-ts";
import { THREE } from "../ThreeJS";
import ColorH from "./ColorH";
import CSSH from "./CSSSH";
import TailwindH from "./TailwindH";

export type TColorTokens = Record<string, IColorToken>;

export interface IColorToken {
	name: string;
	value: THREE.ColorRepresentation;
}

/**
 *
 */
export default class TailwindMirrorH {
	public static get ColorTokensRecord() {
		return TailwindMirrorH.colorTokens as Readonly<TColorTokens>;
	}

	public static readonly colorTokens = {
		GBACKGROUND: { name: "GBACKGROUND", value: "#0a192f" } as IColorToken,

		GGRAY: { name: "GGRAY", value: "#8892b0" } as IColorToken,
		GWHITE: { name: "GWHITE", value: "#ccd6f6" } as IColorToken,

		GACTIVEABLE: { name: "GACTIVEABLE", value: "#1BC3E9" } as IColorToken,
		GACTIVE: { name: "GACTIVE", value: "#64ffda" } as IColorToken,

		GACTIVERIGHT: { name: "GACTIVERIGHT", value: "#FF3333" } as IColorToken,
		GACTIVELEFT: { name: "GACTIVELEFT", value: "#00CCCC" } as IColorToken,
	};

	public static async injectColorTokensToCSSDocument() {
		for (const key in TailwindMirrorH.ColorTokensRecord) {
			const { value } = TailwindMirrorH.ColorTokensRecord[key];

			const cssName = TailwindH.TWVariableName_To_CSSVariableName(key);
			const cssvalue = ColorH.IRGB_to_CSSRGBAString(new THREE.Color(value));

			document.documentElement.style.setProperty(cssName, cssvalue);
			console.log(
				"TailwindMirrorH.injectColorTokensToCSSDocument: Color token injected:" +
					key +
					" injected name: " +
					cssName +
					" original value: " +
					JSON.stringify(value) +
					" injected value: " +
					JSON.stringify(cssvalue)
			);

			const isValid = CSSH.getCssVariableValueAsString(cssName);
			if (option.isSome(isValid)) {
				console.log("---successfully color from css document: " + isValid.value);
				if (isValid.value === cssvalue) {
					console.log("---Color value matches its tw reflection");
				}
			}
		}
	}
}
