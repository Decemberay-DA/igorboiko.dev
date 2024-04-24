// to be able to import .glsl files as strings in to ts files
declare module "*.glsl" {
	const glslShader: string;
	export default glslShader;
}
declare module "*.vert" {
	const vertexShader: string;
	export default vertexShader;
}
declare module "*.frag" {
	const fragmentShader: string;
	export default fragmentShader;
}
declare module "*.config.js" {
	const config: any;
	export default config;
}
declare module "tailwind.config" {
	const config: any;
	export default config;
}

// declare module "*.gltf" {
// 	const a: string;
// 	export default a;
// }
// declare module "*.glb" {
// 	const a: string;
// 	export default a;
// }
