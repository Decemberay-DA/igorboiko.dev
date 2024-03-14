import { GE } from "@/scripts/GameEngine";
import * as THREE from "three";
import fragment from "./BGShader.glsl";

export default class BackgroundMaterial extends GE.ADynamicObject {
    public readonly shader: THREE.ShaderMaterial;

    public constructor() {
        super();
        this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.threeScene;

        this.shader = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 1.0 },
            },
            fragmentShader: fragment,
        });
    }

    public override onFrameUpdate(): void {
        this.shader.uniforms.time.value = GE.GameTime.realTimeSinceStartup;
    }
}
