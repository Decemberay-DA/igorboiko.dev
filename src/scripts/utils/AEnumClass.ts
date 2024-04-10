export default abstract class AEnumClass {
	public readonly this = this.getName();
	private getName() {
		let name = this.constructor.name;
		if (name.charAt(0) === "E") {
			name = name.substring(1);
		}
		return name;
	}
}
