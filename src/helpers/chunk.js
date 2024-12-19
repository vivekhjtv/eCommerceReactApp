export const chunkCategories = (categories, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < categories.length; i += chunkSize) {
    chunks.push(categories.slice(i, i + chunkSize));
  }
  return chunks;
};
