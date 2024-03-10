import { Logger } from "../DevUnilities";
import { GE } from "../GameEngine/index";
import * as THREE from "three";

import { createApp } from "vue";
// import ThreeSceneBackground from "./ThreeSceneBackground.vue";

export class ThreeScene extends GE.DynamicObject {
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private three_scene_bacground!: HTMLElement;

    // Singletotning ========-====-====-====-============
    private static _instance: ThreeScene = new ThreeScene();
    public static get instance() {
        return this._instance;
    }
    private constructor() {
        super();
        this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.threeScene;
        alert("ThreeScene created");

        const bg: HTMLElement | null = document.getElementById(
            "three_scene_bacground.788320a9-5a74-4ab4-83c8-09ebb725c294"
        );

        if (bg == null) {
            // alert("three_scene_bacground was found");
            // const app = createApp(ThreeSceneBackground);
            // app.mount("#app");
            // this.three_scene_bacground = app._component.
            Logger.write("three_scene_bacground not found", 30);
        } else {
            this.three_scene_bacground = bg;
            // alert("three_scene_bacground was not found");
            Logger.write("three_scene_bacground ws found");
        }

        // Scene ========-====-====-====-============
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderParameters: THREE.WebGLRendererParameters = {
            canvas: this.three_scene_bacground,
            precision: "lowp",
        };
        this.renderer = new THREE.WebGLRenderer(renderParameters);

        // lights ========-====-====-====-============
        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(0, 1, 1).normalize();
        this.scene.add(light);

        // Meshes ========-====-====-====-============
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
    }

    public override onFrameUpdate() {
        this.renderer.render(this.scene, this.camera);
    }
}
