import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Its purpose is to give me loaded three scene object from ,gltf file
 */
export class GLTFLoaderchik {
	public static async aGelLoadedGLTF(): Promise<GLTF> {
		const loader = new GLTFLoader();

		const p: Promise<GLTF> = new Promise((resolve, reject) => {
			loader.load(
				"/public/models/scene.gltf",
				(gltf) => {
					resolve(gltf);
				},
				(xhr) => {
					console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
				},
				(error) => {
					console.error("Very serious Error when loading GLTF BGScene: " + error);
					reject(error);
				}
			);
		});

		return p;
	}
}
