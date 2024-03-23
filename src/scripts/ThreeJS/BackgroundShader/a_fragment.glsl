uniform float time;
uniform vec2 resolution;
uniform float pallete_mix_factor;
uniform float sin_factor;

varying vec2 vUv;

vec3 paletteA(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.1, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
}
vec3 paletteB(float t) {
    vec3 a = vec3(0.5, 0.2, 1.0);
    vec3 b = vec3(1.0, 0.5, 0.5);
    vec3 c = vec3(0.75, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = (vUv * 2.0 - 1.0) * vec2(resolution.x / resolution.y, 1.0);
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    
    for (float i = 0.0; i < 5.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));


        vec3 colA = paletteA(length(uv0) + i * .4 + time * .4);
        vec3 colB = paletteB(length(uv0) + i * .4 + time * .4);
        vec3 col = mix(colA, colB, pallete_mix_factor);

        d = sin(d * 8. + time) / 8.;
        d = abs(d);
        
        d = sin(d * sin_factor);

        float pow_factor = mix(0.010, 0.012, sin_factor);
        d = pow(pow_factor / d, 1.2);

        finalColor += col * d;
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
}