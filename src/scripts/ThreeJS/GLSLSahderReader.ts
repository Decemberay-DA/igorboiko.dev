/**
 * Allows for me to write .glsl shader in one file and debug it in vscode or shadered
 * And then allows to read its content inbeetween delimiters to pass it in to THREE.ShaderMaterial
 * omg that wont work!!
 */
export class GLSLSahderReader {
	private constructor() {}

	public static readonly vertexShaderStartDelimiter =
		"// VERTEX SHADER START ========-====-====-====-============";
	public static readonly vertexShaderEndDelimiter =
		"// VERTEX SHADER END ========-====-====-====-============";
	public static readonly fragmentShaderStartDelimiter =
		"// FRAGMENT SHADER START ========-====-====-====-============";
	public static readonly fragmentShaderEndDelimiter =
		"// FRAGMENT SHADER END ========-====-====-====-============";

	public static extractVertexShader(glslDocument: string): string {
		const match = glslDocument.match(
			new RegExp(`${this.vertexShaderStartDelimiter}([\\s\\S]*?)${this.vertexShaderEndDelimiter}`, "m")
		);

		if (match && match[1]) return match[1].trim();

		alert("Vertex shader not found");
		throw new Error("Vertex shader not found");
	}

	public static extractFragmentShader(glslDocument: string): string {
		const match = glslDocument.match(
			new RegExp(
				`${this.fragmentShaderStartDelimiter}([\\s\\S]*?)${this.fragmentShaderEndDelimiter}`,
				"m"
			)
		);

		if (match && match[1]) return match[1].trim();

		alert("Fragment shader not found");
		throw new Error("Fragment shader not found");
	}
}
