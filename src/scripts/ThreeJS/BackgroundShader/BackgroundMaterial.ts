import * as THREE from "three";
import { TJ } from "..";
import { GE } from "@/scripts/GameEngine";

import a_vertex from "./a_vertex.glsl";
import a_fragment from "./a_fragment.glsl";
import { asi } from "@/scripts/asi/asi";

export class BackgroundMaterial extends TJ.AManagimentedShaderMaterial {
	public constructor() {
		super();

		const loader = new THREE.TextureLoader();
		const texture = loader.load("src/scripts/ThreeJS/CommonAssets/CheckerDark_2D.jpg");

		this.__shader = new THREE.ShaderMaterial({
			vertexShader: a_vertex,
			fragmentShader: a_fragment,
			uniforms: {
				time: { value: 0 },
				pallete_mix_factor: { value: 0 },
				sin_factor: { value: 0 },
				resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
				background_texture: {
					value: texture,
				},
			},
		});
	}

	public override onFrameUpdate(): void {
		this.__shader.uniforms.time.value = GE.GameTime.realTimeSinceStartup;
		this.__shader.uniforms.pallete_mix_factor.value = asi.data.Cursor.clientRelstive.position0to1.x;
		this.__shader.uniforms.sin_factor.value = asi.data.Cursor.clientRelstive.position0to1.x * 50 + 1;
		this.__shader.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
	}
}
