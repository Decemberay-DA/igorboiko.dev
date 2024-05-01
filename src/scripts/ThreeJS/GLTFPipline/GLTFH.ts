import type { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
import { option } from "fp-ts";
import { pipe } from "fp-ts/function";

/**
 *
 */
export class GLTFH {
	public static getuserDataPropertyValue(
		object: THREE.Object3D,
		propertyName: string
	): option.Option<string> {
		return pipe(
			object.userData,
			option.fromNullable,
			option.match(
				() => {
					console.error("GLTFH.getUserPropertyValue: not found extras for object: " + object.name);
					return option.none;
				},
				(data) => (data ? option.some<string>(data[propertyName]) : option.none)
			),
			option.match(
				() => {
					console.error(
						"GLTFH.getUserPropertyValue: not found property named: " +
							propertyName +
							" on object: " +
							object.name
					);
					return option.none;
				},
				(value) => option.some<string>(value)
			)
		);
	}
}
