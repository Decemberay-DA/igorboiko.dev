import { option } from "fp-ts";

export default class CSSH {
	public static getCssVariableValueAsString(cssVariableName: string): option.Option<string> {
		const val = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName).trim();

		return val === "" ? getNone() : option.some(val);

		function getNone(){
			console.warn("failed to get css variable named " + cssVariableName + " from document");
			return option.none;
		}
	}

	public static listAllCssColorVariables(): string {
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
