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
