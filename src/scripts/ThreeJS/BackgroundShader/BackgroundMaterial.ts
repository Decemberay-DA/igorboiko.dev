import * as THREE from "three";
// import fragment from "./BGShader.glsl";
import { TJ } from "..";
import { GE } from "@/scripts/GameEngine";

export class BackgroundMaterial extends TJ.AManagimentedShaderMaterial {
	public constructor() {
		super();

		// shader from shadertoy
		this.__shader = new THREE.ShaderMaterial({
			uniforms: {
				time: { value: 0 },
				resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
			},
			vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
			fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec3 col = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
            gl_FragColor = vec4(col,1.0);
        }
    `,
		});
	}

	public override onFrameUpdate(): void {
		this.__shader.uniforms.time.value = GE.GameTime.realTimeSinceStartup;
		this.__shader.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
	}
}
