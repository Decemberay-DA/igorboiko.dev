uniform float time;
uniform float sceneTime;
uniform vec3 defaultColor;

varying vec2 vUv;
varying vec4 vColor;

// noiseTexture ========-====-====-====-============
uniform sampler2D noiseTexture;
uniform float noiseScale;
uniform float noiseStrength;

// main ========-====-====-====-============
void main() {
    vec3 c = vec3(vColor);
    if(c == vec3(0.0)) {
        c = defaultColor;
    }

    float timeWOWOW = (sin(sceneTime * 0.2345) + 0.5) * 0.5;

    // noiseTexture ========-====-====-====-============
    float noiseColor = texture2D(noiseTexture, fract(vUv * noiseScale)).x;
    noiseColor = mix(1.0, noiseColor, noiseStrength);

    c = vec3(c.x * noiseColor, c.y * noiseColor, c.z * noiseColor);
    gl_FragColor = vec4(c.x, c.y, c.z, 1);
}
