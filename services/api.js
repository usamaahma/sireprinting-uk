const RESOLVE_API = "/api/resolve";
const BASE_API = "/api/subcategories"; // POST aur GET ALL ke liye

export const subcategoryService = {
  // 1. Saari subcategories get karne ke liye
  async getAll() {
    const res = await fetch(BASE_API, {
      cache: "no-store",
    });
    return res.json();
  },

  // 2. Ek subcategory get karne ke liye (ID ya Slug dono chalenge)
  async getOne(idOrSlug) {
    const res = await fetch(`${RESOLVE_API}/${idOrSlug}`, {
      method: "GET",
      cache: "no-store",
    });
    return res.json();
  },

  // 3. Nayi subcategory create karne ke liye
  async create(data) {
    const res = await fetch(BASE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // 4. Update karne ke liye (Nayi Resolve API use ho rahi hai)
  async update(id, data) {
    const res = await fetch(`${RESOLVE_API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // 5. Delete karne ke liye
  async delete(id) {
    const res = await fetch(`${RESOLVE_API}/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  // 6. Bonus: Parent Category ke through get karne ke liye
  async getByParent(parentSlugOrId) {
    const res = await fetch(`${RESOLVE_API}/${parentSlugOrId}?type=parent`, {
      method: "GET",
      cache: "no-store",
    });
    return res.json();
  },
};
