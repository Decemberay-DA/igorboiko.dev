import { fromNullable } from "fp-ts/lib/Either";
import type { ITailwindConfigColorsJS } from "./TailwindToCSSImprinterH";

/**
 *
 */
export default class TailwindH {
	// public static TailwindConfig = require("../tailwind.config.js");

	public static async getTailwindColors(): Promise<ITailwindConfigColorsJS> {
		// const colors = TailwindH.TailwindConfig.theme.extend.colors;

		// const transformedColors: ITailwindConfigColorsJS = {
		// 	GBACKGROUND: { name: "GBACKGROUND", value: colors.GBACKGROUND },
		// 	GGRAY: { name: "GGRAY", value: colors.GGRAY },
		// 	GWHITE: { name: "GWHITE", value: colors.GWHITE },
		// 	GACTIVEABLE: { name: "GACTIVEABLE", value: colors.GACTIVEABLE },
		// 	GACTIVE: { name: "GACTIVE", value: colors.GACTIVE },
		// 	GACTIVERIGHT: { name: "GACTIVERIGHT", value: colors.GACTIVERIGHT },
		// 	GACTIVELEFT: { name: "GACTIVELEFT", value: colors.GACTIVELEFT },
		// 	Navy: { name: "Navy", value: colors.Navy },
		// 	LightNavy: { name: "LightNavy", value: colors.LightNavy },
		// 	LightestNavy: { name: "LightestNavy", value: colors.LightestNavy },
		// 	Slate: { name: "Slate", value: colors.Slate },
		// 	LightSlate: { name: "LightSlate", value: colors.LightSlate },
		// 	LightestSlate: { name: "LightestSlate", value: colors.LightestSlate },
		// 	White: { name: "White", value: colors.White },
		// 	Green: { name: "Green", value: colors.Green },
		// };

		// console.log("TailwindH.getTailwindColors: " + JSON.stringify(transformedColors));

		// return transformedColors;
		throw new DOMException("nut");
	}

	public static TWVariableNameToCSSVariableName(tailwingVariableName: string): string {
		return `--tw-${tailwingVariableName}`;
	}
	public static CSSVariableNameToTWVariableName(cssVariableName: string): string {
		return cssVariableName.startsWith("--tw-") //
			? cssVariableName.substring(5)
			: cssVariableName;
	}
}
