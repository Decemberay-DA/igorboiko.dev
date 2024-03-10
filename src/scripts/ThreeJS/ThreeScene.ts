import { Logger } from "../DevUnilities";
import { GE } from "../GameEngine/index";
import * as THREE from "three";

// import { createApp } from "vue";
// import ThreeSceneBackground from "./ThreeSceneBackground.vue";

export class ThreeScene extends GE.ADynamicObject {
    public readonly bacgroundContainer: HTMLElement;
    public readonly scene: THREE.Scene;
    public readonly camera: THREE.PerspectiveCamera;
    public readonly renderer: THREE.WebGLRenderer;

    public constructor(bacgroundContainer: HTMLElement) {
        super();
        this.disable();
        this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.threeScene;
        this.bacgroundContainer = bacgroundContainer;

        // Scene ========-====-====-====-============
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x808080);
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = this.getRenderer();

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

    private getRenderer(): THREE.WebGLRenderer {
        const renderParameters: THREE.WebGLRendererParameters = {
            // canvas: this.bacgroundContainer, // here the error
            antialias: true,
            precision: "lowp",
        };
        const renderer = new THREE.WebGLRenderer(renderParameters);

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(
            this.bacgroundContainer.clientWidth,
            this.bacgroundContainer.clientHeight
        );
        this.bacgroundContainer.appendChild(renderer.domElement);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";

        // resize render window
        window.addEventListener(
            "resize",
            this.onWindowResize.bind(this),
            false
        );

        return renderer;
    }
    private onWindowResize() {
        const width = this.bacgroundContainer.clientWidth;
        const height = this.bacgroundContainer.clientHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;

        this.camera.updateProjectionMatrix();
    }

    public override onFrameUpdate() {
        this.renderer.render(this.scene, this.camera);
    }
}
