export const generatedDishImage = (dishName: string): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  const width = 400;
  const height = 300;
  canvas.width = width;
  canvas.height = height;

  const colors = [
    "#2E86AB",
    "#1E1E1E",
    "#37474F",
    "#4E342E",
    "#00695C",
    "#263238",
    "#3E2723",
    "#512DA8",
    "#1565C0",
    "#455A64",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  ctx.fillStyle = randomColor;
  ctx.fillRect(0, 0, width, height);

  const initials = dishName
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials || "U", width / 2, height / 2);

  return canvas.toDataURL("image/png");
};
