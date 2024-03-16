import { GE } from "../GameEngine/index";
import * as THREE from "three";

export abstract class AManagimentedShaderMaterial extends GE.ADynamicObject {
	protected __shader!: THREE.ShaderMaterial;
	public get shader(): THREE.ShaderMaterial {
		return this.__shader;
	}

	protected constructor() {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.THREE_SCENE;
	}

	public override onFrameUpdate(): void {
		this.__shader.uniforms.time.value = GE.GameTime.realTimeSinceStartup;
	}
}
