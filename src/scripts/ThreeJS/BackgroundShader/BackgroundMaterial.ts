import * as THREE from "three";
import { TJ } from "..";
import { GE } from "@/scripts/GameEngine";
import { GLSLSahderReader } from "../GLSLSahderReader";
import BGShader_glsl from "./BGShader.glsl";

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

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    // Convert vUv from [0,1] range to [-1,1] range and maintain aspect ratio
    vec2 uv = (vUv * 2.0 - 1.0) * vec2(resolution.x / resolution.y, 1.0);
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    
    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i * .4 + time * .4);

        d = sin(d * 8. + time) / 8.;
        d = abs(d);

        d = pow(0.01 / d, 1.2);

        finalColor += col * d;
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
}
		`,
		});

		// // shader from shadertoy
		// this.__shader = new THREE.ShaderMaterial({
		// 	uniforms: {
		// 		time: { value: 0 },
		// 		resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
		// 	},
		// 	vertexShader: `
		//     varying vec2 vUv;
		//     void main() {
		//         vUv = uv;
		//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		//     }
		// `,
		// 	fragmentShader: `
		//     uniform float time;
		//     uniform vec2 resolution;
		//     varying vec2 vUv;
		//     void main() {
		//         vec2 uv = gl_FragCoord.xy / resolution.xy;
		//         vec3 col = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
		//         gl_FragColor = vec4(col,1.0);
		//     }
		// `,
		// });

		// this.__shader = new THREE.ShaderMaterial({
		// 	uniforms: {
		// 		time: { value: 0 },
		// 		resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
		// 	},
		// 	vertexShader: GLSLSahderReader.extractVertexShader(BGShader_glsl),
		// 	fragmentShader: GLSLSahderReader.extractFragmentShader(BGShader_glsl),
		// });
	}

	public override onFrameUpdate(): void {
		this.__shader.uniforms.time.value = GE.GameTime.realTimeSinceStartup;
		this.__shader.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
	}
}
