function sliceText(text, length = 175, ending = "...") {
  if (!text) return "";
  if (text.length <= length) return text;

  const truncated = text.slice(0, length);

  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return lastSpaceIndex !== -1
    ? truncated.slice(0, lastSpaceIndex) + ending
    : truncated + ending;
}

export default sliceText;
