import * as THREE from "three";

export default interface ITransforms {
	position: THREE.Vector3;
	quaternion: THREE.Quaternion;
	scale: THREE.Vector3;
}
