

// VERTEX SHADER START ========-====-====-====-============
varying vec2 vUv;
void main() { // waaaaaaaaaaaaa!!!!!
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
// VERTEX SHADER END ========-====-====-====-============



// FRAGMENT SHADER START ========-====-====-====-============
uniform float time;
uniform vec2 resolution;
varying vec2 vUv;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(col,1.0);
}
// FRAGMENT SHADER END ========-====-====-====-============