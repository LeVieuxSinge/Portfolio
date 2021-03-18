export function map(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export function degToRad(deg) {
  return deg * Math.PI / 180;
}

export function lerp(a, b, t) {
  return ((1 - t) * a + t * b);
}

export function visibleHeightAtZDepth(depth, camera) {
  // compensate for cameras not positioned at z=0
  var cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  var vFOV = camera.fov * Math.PI / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
}

export function visibleWidthAtZDepth(depth, camera) {
  var height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
}