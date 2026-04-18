export const calculateReadingTime = (text) => {
  if (!text || typeof text !== "string") return 0;

  const cleanText = text.replace(/<[^>]*>/g, "");
  const words = cleanText.trim().split(/\s+/).length;

  return Math.ceil(words / 200);
};
