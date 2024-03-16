import * as THREE from "three";
import fragment from "./BGShader.glsl";
import { TJ } from "..";

export class BackgroundMaterial extends TJ.AManagimentedShaderMaterial {
	public constructor() {
		super();

		this.__shader = new THREE.ShaderMaterial({
			uniforms: {
				time: { value: 1.0 },
			},
			fragmentShader: fragment,
		});
	}
}
