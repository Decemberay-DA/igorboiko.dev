import TailwindH from "./TailwindH";
import type { IColorToken } from "./TailwindMirrorH";

export default class TailwindToCSSImprinterH {
	public static async imprint() {
		const colorsJS = await TailwindH.getTailwindColors();
		await TailwindToCSSImprinterH.initCSSColors(colorsJS);
	}

	public static async injectTailwindVariablesToDocument() {
		let styleTag = document.getElementById("tailwind-css-variables");
		if (!styleTag) {
			styleTag = document.createElement("style");
			styleTag.id = "tailwind-css-variables";
			document.head.appendChild(styleTag);
		}

		// const colorVariables = tailwindConfigJS.theme.extend.colors;

		let cssVariables = "";
		// for (const [key, value] of Object.entries(colorVariables)) {
		// 	cssVariables += `--tw-${key}: ${value};\n`;
		// }

		styleTag.textContent = `:root {\n${cssVariables}}`;

		console.log("Tailwind color variables injected to css document");
	}

	public static async initCSSColors(twColors: Record<string, IColorToken>) {
		for (const colorName in twColors) {
			if (!twColors.hasOwnProperty(colorName)) return;

			const color = twColors[colorName];

			const cssVariableName = TailwindH.TWVariableName_To_CSSVariableName(colorName);
			document.documentElement.style.setProperty(cssVariableName, color.value.toString());
		}
	}
}
