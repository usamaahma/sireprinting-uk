export const generateSlug = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "") // English ke ilawa sab uda dega
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, ""); // Shuru aur aakhir ke dashes khatam
};

export const generateSKU = (title, parent) => {
  const prefix = (parent || title || "SUB").substring(0, 3).toUpperCase();
  const uniquePart = Date.now().toString().slice(-4); // Duplicate se bachne ke liye timestamp
  return `${prefix}-${uniquePart}`;
};

export const generateShortId = (prefix = "item") => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};
