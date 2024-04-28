import asi from "../../asi/asi";
import { GE } from "../../GameEngine/index";
import * as THREE from "three";

type notmounted = null;

export class ThreeScene extends GE.ADynamicObject {
	public readonly scene: THREE.Scene;
	private _camera!: THREE.PerspectiveCamera;
	public readonly renderer: THREE.WebGLRenderer;

	// getters setters ========-====-====-====-============
	public get camera(): THREE.PerspectiveCamera {
		return this._camera;
	}
	public setCamera(newCamera: THREE.PerspectiveCamera): void {
		newCamera.near = 0.1;
		newCamera.far = 10000;
		this._camera = newCamera;
	}

	private _HTMLContainer: HTMLElement | notmounted = null;
	public get HTMLContainer(): HTMLElement | notmounted {
		return this._HTMLContainer;
	}

	public constructor() {
		super();
		this.disable(); // disabled untill being mounted to htmlelement
		this.onFrameUpdateOrder = GE.OnFrameUpdatePriorities.THREE_SCENE;

		// Scene ========-====-====-====-============
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0, 0, 0);
		this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			precision: "lowp",
		});
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
		window.addEventListener("resize", this.onWindowResize);
	}
	public unMount() {
		if (!this._HTMLContainer || !this._HTMLContainer.contains(this.renderer.domElement)) return;

		this.disable();

		this._HTMLContainer.removeChild(this.renderer.domElement);

		window.removeEventListener("resize", this.onWindowResize);
	}

	private onWindowResize() {
		if (!this._HTMLContainer) return;

		// const width = window.innerWidth;
		// const height = window.innerHeight;
		const width = this._HTMLContainer.clientWidth;
		const height = this._HTMLContainer.clientHeight;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
	}

	public override onFrameUpdate() {
		this.renderer.render(this.scene, this.camera);

		// Simple animation to differe bg from everything else ========-====-====-====-============
		// const color = new THREE.Color(
		// 	Math.sin(GE.GameTime.realTimeSinceStartup),
		// 	asi.data.Cursor.clientRelstive.position.x,
		// 	asi.data.Cursor.clientRelstive.position.y
		// );
		// this.scene.background = color.lerp(new THREE.Color(0.5, 0.5, 0.5), 0.75);
	}

	public override onDelete(): void {
		super.onDelete();
		this.unMount();
	}
}
