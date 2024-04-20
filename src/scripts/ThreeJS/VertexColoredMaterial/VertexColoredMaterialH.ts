import { pipe } from "fp-ts/lib/function";
import { THREE } from "../ThreeEngine/THREE";
import { array } from "fp-ts";

export class VertexColoredMaterialH {
	public static assignWhiteVertexColorsToSceneIfHasNoVC(scene: THREE.Scene): void {
		pipe(
			scene.children,
			array.filter((ch) => ch instanceof THREE.Mesh),
			array.map((ch) => VertexColoredMaterialH.assignWhiteVertexColors(ch, new THREE.Color(1, 1, 0.95)))
		);
	}

	public static doesMeshHasVertexColor(mesh: THREE.Mesh): boolean {
		return mesh.geometry.attributes.color && mesh.geometry.attributes.color.count > 0;
	}

	public static assignWhiteVertexColors(mesh: THREE.Mesh, color: THREE.Color): void {
		if (!VertexColoredMaterialH.doesMeshHasVertexColor(mesh)) {
			const numVertices = mesh.geometry.attributes.position.count;
			const colors = new Float32Array(numVertices * 4);
			for (let i = 0; i < numVertices * 4; i += 4) {
				colors[i] = color.r;
				colors[i + 1] = color.g;
				colors[i + 2] = color.b;
				colors[i + 3] = 1;
			}

			const colorAttribute = new THREE.BufferAttribute(colors, 4);

			mesh.geometry.setAttribute("color", colorAttribute);
		}
	}
}
