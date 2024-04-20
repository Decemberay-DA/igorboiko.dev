import type { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
import type { Option } from "fp-ts/lib/Option";
import { option } from "fp-ts";
import { pipe } from "fp-ts/function";
import type { TGLTFAsset } from "./TGLTFAsset";

/**
 *
 */
export class GLTFH {
	public static getUserDataValue(object: THREE.Object3D, propertyName: string): Option<string> {
		return pipe(
			(object as TGLTFAsset).extras,
			option.fromNullable,
			option.map((extras) => extras[propertyName])
		);
	}
}
