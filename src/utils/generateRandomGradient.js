function generateRandomColor() {
  const color = `#${Math.floor(Math.random() * 16777216)
    .toString(16)
    .padStart(6, "0")}`;
  return color;
}

export default function generateRandomGradient() {
  const startColor = generateRandomColor();
  const endColor = generateRandomColor();

  return [startColor, endColor];
}
