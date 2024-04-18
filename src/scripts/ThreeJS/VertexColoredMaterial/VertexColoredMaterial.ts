import { TJ } from "..";
import { THREE } from "../THREE";

import a_vertex from "./a_vertex.glsl";
import a_fragment from "./a_fragment.glsl";
import { GE } from "@/scripts/GameEngine";
import { instance } from "three/examples/jsm/nodes/Nodes.js";

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
				// worldMatrix: { value: new THREE.Matrix4() },
				// scale: { value: new THREE.Vector3(1, 1, 1) },
				// vPosition: { value: new THREE.Vector3(1, 1, 1) },
			},
		});
		this.__shader.name = "VertexColoredMaterial";
	}

	public static doesMeshHasVertexColor(mesh: THREE.Mesh): boolean {
		return mesh.geometry.attributes.color && mesh.geometry.attributes.color.count > 0;
	}
	public static assignWhiteVertexColors(mesh: THREE.Mesh, color: THREE.Color): void {
		if (!VertexColoredMaterial.doesMeshHasVertexColor(mesh)) {
			const numVertices = mesh.geometry.attributes.position.count;
			const colors = new Float32Array(numVertices * 4);
			for (let i = 0; i < numVertices * 4; i += 4) {
				colors[i] = color.r;
				colors[i + 1] = color.g;
				colors[i + 2] = color.b;
				colors[i + 3] = 1.0;
			}

			const colorAttribute = new THREE.BufferAttribute(colors, 4);

			mesh.geometry.setAttribute("color", colorAttribute);
		}
	}
	public static assignWhiteVertexColorsToSceneIfHasNoVC(scene: THREE.Scene): void {
		scene.traverse((object) => {
			if (object instanceof THREE.Mesh) {
				VertexColoredMaterial.assignWhiteVertexColors(object, new THREE.Color(1, 1, 0.95));
			}
		});
	}

	public override onFrameUpdate(): void {
		this.__shader.uniforms.sceneTime.value = GE.GameTime.realTimeSinceStartup;
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
