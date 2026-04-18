const cleanText = (html) => {
  if (!html) return "";

  // Decode HTML entities
  const txt = document.createElement("textarea");
  txt.innerHTML = html;

  // Remove remaining HTML tags
  return txt.value.replace(/<[^>]*>?/gm, "");
};
export default cleanText;