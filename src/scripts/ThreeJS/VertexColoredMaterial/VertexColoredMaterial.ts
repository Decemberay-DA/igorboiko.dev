import { TJ } from "..";
import { THREE } from "../ThreeEngine/THREE";

import a_vertex from "./a_vertex.glsl";
import a_fragment from "./a_fragment.glsl";
import { GE } from "@/scripts/GameEngine";

export class VertexColoredMaterial extends TJ.AManagimentedShaderMaterial {
	public static instances: VertexColoredMaterial[] = [];

	public constructor() {
		super();

		const noiseTexture = new THREE.TextureLoader().load(
			"src/scripts/ThreeJS/VertexColoredMaterial/noiseT.png"
		);

		this.__shader = new THREE.ShaderMaterial({
			vertexShader: a_vertex,
			fragmentShader: a_fragment,
			// wireframe: true,
			side: THREE.DoubleSide,
			vertexColors: true,
			uniforms: {
				// noiseTexture ========-====-====-====-============
				noiseTexture: { value: noiseTexture },
				noiseScale: { value: 5 },
				noiseStrength: { value: 0.04 },

				sceneTime: { value: 0 },
				defaultColor: { value: new THREE.Color(0xffffff) },

				// // worldTriplanar ========-====-====-====-============
			},
		});
		this.__shader.name = "VertexColoredMaterial";
	}

	public override onFrameUpdate(): void {
		this.__shader.uniforms.sceneTime.value = GE.GameTime___.sinceStart;
	}

	public static applyOn(meshes: THREE.Mesh[]): void {
		for (const mesh of meshes) {
			const materialInstance = new VertexColoredMaterial();
			// materialInstance.__shader.uniforms.instance_id.value = VertexColoredMaterial.instances.length;
			VertexColoredMaterial.instances.push(materialInstance);
			mesh.material = materialInstance.__shader;
		}
	}
}
