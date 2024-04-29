import { option } from "fp-ts";
import { THREE } from "../ThreeJS";
import ColorEncodeH from "./ColorEncodeH";
import CSSH from "./CSSSH";
import TailwindH from "./TailwindH";

export type TColorTokens = Readonly<Record<string, IColorToken>>;

export type IColorToken = Readonly<_IColorToken>;

interface _IColorToken {
	/**
	 * name of token
	 */
	name: Readonly<string>;
	/**
	 * the most original value that i setted from start. doesnt changes never
	 * WRITTEN IN HEX COLOR CODING!!!!
	 */
	originalValue: Readonly<THREE.ColorRepresentation>;
}

/**
 *
 */
export default class TailwindMirrorH {
	static get colorsRecord() {
		return TailwindMirrorH.colors as TColorTokens;
	}

	static readonly colors = {
		GBACKGROUND: { name: "GBACKGROUND", originalValue: "#0a192f" } as IColorToken,

		GGRAY: { name: "GGRAY", originalValue: "#8892b0" } as IColorToken,
		GWHITE: { name: "GWHITE", originalValue: "#ccd6f6" } as IColorToken,

		GACTIVEABLE: { name: "GACTIVEABLE", originalValue: "#1BC3E9" } as IColorToken,
		GACTIVE: { name: "GACTIVE", originalValue: "#64ffda" } as IColorToken,

		GACTIVERIGHT: { name: "GACTIVERIGHT", originalValue: "#FF3333" } as IColorToken,
		GACTIVELEFT: { name: "GACTIVELEFT", originalValue: "#00CCCC" } as IColorToken,
	};

	static async injectColorTokensToCSSDocument() {
		for (const key in TailwindMirrorH.colorsRecord) {
			const { originalValue: value } = TailwindMirrorH.colorsRecord[key];

			const cssName = TailwindH.TWVariableName_To_CSSVariableName(key);
			const cssvalue = ColorEncodeH.IRGB_to_CSSRGBAString(new THREE.Color(value));

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
