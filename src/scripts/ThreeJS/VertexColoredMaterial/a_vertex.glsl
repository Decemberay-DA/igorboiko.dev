varying vec2 vUv;

uniform vec3 defaultColor;
varying vec4 vColor;

float randFromSeed(int seeda) {
	float seed = float(seeda);
	float hash = float(seed * 1103515245.054 + 12345.054);
	return sin(float(seed * hash * 4543.21564 + float(hash) / float(0x7FFFFFFF)) * (0.0004658423 * float(seed)));
}

void main() {
	vUv = uv;
	vColor = color;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
