const getBaseUrl = () => {
  // 1. Agar browser (client-side) hai, toh relative path hamesha 100% sahi chalega
  if (typeof window !== "undefined") return "";

  // 2. Server-side (SSR/Build) ke liye sabse pehle aapki custom live domain check karega
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  // 3. Fallback: Agar custom domain nahi set, toh Vercel ka automatic URL utha lega
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // 4. Local machine fallback
  return "http://localhost:3000";
};

const RESOLVE_API = `${getBaseUrl()}/api/resolve`;
const BASE_API = `${getBaseUrl()}/api/subcategories`;

const safeFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {
        success: false,
        error: `Server status ${res.status}: Non-JSON response`,
      };
    }
    return await res.json();
  } catch (error) {
    console.error(`[API Error] URL: ${url} ->`, error);
    return { success: false, error: error.message || "Network request failed" };
  }
};

export const subcategoryService = {
  async getAll() {
    return safeFetch(BASE_API, { cache: "no-store" });
  },
  async getOne(idOrSlug) {
    return safeFetch(`${RESOLVE_API}/${idOrSlug}`, {
      method: "GET",
      cache: "no-store",
    });
  },
  async create(data) {
    return safeFetch(BASE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  async update(id, data) {
    return safeFetch(`${RESOLVE_API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  async delete(id) {
    return safeFetch(`${RESOLVE_API}/${id}`, { method: "DELETE" });
  },
  async getByParent(parentSlugOrId) {
    return safeFetch(`${RESOLVE_API}/${parentSlugOrId}?type=parent`, {
      method: "GET",
      cache: "no-store",
    });
  },
};
