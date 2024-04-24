import type RGB from "../utils/RGB";
import ColorH from "./ColorH";
import TailwindH from "./TailwindH";

export default class CSSH {
	public static getCssVariable(variableName: string): string {
		return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
	}

	public static newRGBFromTWVariable(twColorVariableName: string): RGB {
		const cssName = TailwindH.TWVariableNameToCSSVariableName(twColorVariableName);

		const cssV = CSSH.getCssVariable(cssName);
		const isValuePresent = cssV !== "";
		if (!isValuePresent) console.warn("CSS value " + cssName + " is not present in document");
		console.log("Color getCssVariable: " + JSON.stringify(cssV));

		const c = ColorH.hexToRgb(cssV) ?? { r: 1, g: 0, b: 1 };
		console.log("Color hexToRgb: " + JSON.stringify(c));

		return c;
	}

	public static listCssColorVariables(): string {
		const styles = getComputedStyle(document.documentElement);
		let result = "";

		for (let i = 0; i < styles.length; i++) {
			const propertyName = styles[i];
			if (propertyName.startsWith("--tw-G")) {
				const variableValue = getComputedStyle(document.documentElement)
					.getPropertyValue(propertyName)
					.trim();
				result += `${propertyName}: ${variableValue}\n`;
			}
		}
		return result;
	}
}
