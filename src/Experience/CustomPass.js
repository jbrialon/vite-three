import { Fn, uniform, uv, texture, vec4 } from "three/tsl";

const readDepth = Fn(([depthTex, uvCoord, near, far]) => {
  const fragCoordZ = depthTex.sample(uvCoord).r;
  const viewZ = fragCoordZ.mul(2.0).sub(1.0);
  const linearDepth = near.mul(far).div(far.add(viewZ.mul(near.sub(far))));
  return linearDepth.sub(near).div(far.sub(near));
});

/**
 * Pixelation effect
 * @param {Node} color - Input color texture node
 * @param {Object} options - Effect parameters
 * @returns {Node} - Modified color output
 */
export const customPixelate = (color, sceneDepthPassColor, options = {}) => {
  const pixelSize = uniform(options.pixelSize || 0.005);

  return Fn(() => {
    // Get the current UV coordinates
    const uvCoord = uv();

    // Snap UV to pixel grid
    const pixelatedUV = uvCoord.div(pixelSize).floor().mul(pixelSize);

    // Sample the texture at the pixelated UV
    const pixelatedColor = texture(color, pixelatedUV);

    const depth = readDepth(sceneDepthPassColor, uvCoord, 0.1, 100);

    return vec4(depth, depth, depth, 1.0);
  })();
};
