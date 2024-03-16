// to be able to import .glsl files as strings in to ts files
declare module "*.glsl" {
	const content: string;
	export default content;
}
