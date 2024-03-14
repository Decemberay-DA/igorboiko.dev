#version 300 es
precision highp float;

uniform vec2 vUv;
uniform float time;
uniform float greenValue;

out vec4 pc_fragColor;

void main() {
    float blueValue = sin(vUv.x * 2.0 * 3.14159) + time;
    pc_fragColor = vec4(0.325, greenValue, blueValue, 1.0);
}
