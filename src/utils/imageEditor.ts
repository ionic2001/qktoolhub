export type ImageDimensions = { width: number; height: number };

export function clampImageDimension(value: number) {
  return Math.max(64, Math.min(4096, Math.round(value || 64)));
}

export function resizeImageDimensions(
  width: number,
  height: number,
  axis: 'width' | 'height',
  raw: number,
  locked: boolean,
): ImageDimensions {
  const value = clampImageDimension(raw);
  if (!locked) return axis === 'width' ? { width: value, height } : { width, height: value };
  if (axis === 'width') return { width: value, height: clampImageDimension(value * height / width) };
  return { width: clampImageDimension(value * width / height), height: value };
}
