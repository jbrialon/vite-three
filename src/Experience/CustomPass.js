import { Fn, uniform, uv, texture } from "three/tsl";

/**
 * Pixelation effect
 * @param {Node} color - Input color texture node
 * @param {Object} options - Effect parameters
 * @returns {Node} - Modified color output
 */
export const customPixelate = (color, options = {}) => {
  const pixelSize = uniform(options.pixelSize || 0.005);

  return Fn(() => {
    // Get the current UV coordinates
    const uvCoord = uv();

    // Snap UV to pixel grid
    const pixelatedUV = uvCoord.div(pixelSize).floor().mul(pixelSize);

    // Sample the texture at the pixelated UV
    const pixelatedColor = texture(color, pixelatedUV);

    return pixelatedColor;
  })();
};
