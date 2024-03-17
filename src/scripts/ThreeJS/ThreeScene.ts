import { GE } from "../GameEngine/index";
import * as THREE from "three";
import { MegaCursor } from "../MegaCursor";

type notmounted = null;

// import { createApp } from "vue";
// import ThreeSceneBackground from "./ThreeSceneBackground.vue";
export class ThreeScene extends GE.ADynamicObject {
	public readonly scene: THREE.Scene;
	public readonly camera: THREE.PerspectiveCamera;
	public readonly renderer: THREE.WebGLRenderer;

	private _HTMLContainer: HTMLElement | notmounted = null;
	public get HTMLContainer(): HTMLElement | notmounted {
		return this._HTMLContainer;
	}

	public constructor() {
		super();
		this.disable(); // disabled untill being mounted to htmlelement
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.THREE_SCENE;

		// Scene ========-====-====-====-============
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x808080);
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderParameters: THREE.WebGLRendererParameters = {
			antialias: true,
			precision: "lowp",
		};
		this.renderer = new THREE.WebGLRenderer(renderParameters);
		this.renderer.setPixelRatio(window.devicePixelRatio);
	}
	public mountTo(newMountedElement: HTMLElement): void {
		if (this._HTMLContainer && this._HTMLContainer.contains(this.renderer.domElement)) return;

		this.enable();

		this._HTMLContainer = newMountedElement;
		this.renderer.setSize(newMountedElement.clientWidth, newMountedElement.clientHeight);
		this.renderer.domElement.style.width = "100%";
		this.renderer.domElement.style.height = "100%";

		newMountedElement.appendChild(this.renderer.domElement);
		window.addEventListener("resize", this.onWindowResize, false);
	}
	public unMount() {
		if (!this._HTMLContainer || !this._HTMLContainer.contains(this.renderer.domElement)) return;

		this.disable();

		this._HTMLContainer.removeChild(this.renderer.domElement);

		window.removeEventListener("resize", this.onWindowResize, false);
	}

	private onWindowResize() {
		if (!this._HTMLContainer) return;

		const width = this._HTMLContainer.clientWidth;
		const height = this._HTMLContainer.clientHeight;

		this.renderer.setSize(width, height);
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}

	public override onFrameUpdate() {
		this.renderer.render(this.scene, this.camera);

		// Simple animation to differe bg from everything else ========-====-====-====-============
		const color = new THREE.Color(
			Math.sin(GE.GameTime.realTimeSinceStartup),
			MegaCursor.currentPosition.x / window.innerWidth,
			MegaCursor.currentPosition.y / window.innerHeight
		);
		this.scene.background = color.lerp(new THREE.Color(0.5, 0.5, 0.5), 0.75);
	}

	public override onDelete(): void {
		super.onDelete();
		this.unMount();
	}
}
