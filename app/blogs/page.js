import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

async function getAllBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/blogs`, {
      next: { revalidate: 3600 },
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      console.log("Response not OK");
      return [];
    }

    const data = await res.json();

    console.log("Blogs Data:", data);

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function AllBlogsPage() {
  const blogs = await getAllBlogs();

  // Safe Slicing: Agar blogs kam hain toh fallback handle karein
  const recentPosts = blogs.slice(0, 4);
  const popularReads = blogs.length > 4 ? blogs.slice(4, 9) : [];

  // All articles mein hum chahte hain k agar total blogs kam hain toh saare dikhein,
  // aur agar zyada hain toh index 9 k baad wale dikhein.
  const allArticles = blogs.length > 9 ? blogs.slice(9) : blogs;

  return (
    <div className="min-h-screen bg-[#f7f9fa] pb-24 pt-34">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="border-b border-gray-200/60 pb-2">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <div className="py-12 max-w-4xl">
          <span className="text-[11px] font-extrabold tracking-widest text-gray-500 uppercase block mb-2">
            INSIGHTS & GUIDES
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight leading-none mb-4">
            Printing & Packaging blog
          </h1>
          <p className="text-gray-600 text-base max-w-2xl leading-relaxed mb-6">
            Practical tips, trends, and deep dives from the Sire Printing
            team—updated regularly so you can ship smarter.
          </p>
        </div>

        {/* 2. RECENT POSTS SECTION */}
        {recentPosts.length > 0 && (
          <div className="mt-8 bg-white border border-gray-200/80 rounded-sm p-6">
            <div className="border-b border-gray-100 pb-3 mb-6">
              <span className="bg-[#ffa015] text-black text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-sm">
                LATEST
              </span>
              <h2 className="text-xl font-black text-black mt-2">
                Recent posts
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPosts.map((blog) => {
                const blogDate = new Date(blog.createdAt);
                return (
                  <article
                    key={blog._id}
                    className="flex flex-col h-full group"
                  >
                    <div className="h-44 w-full relative bg-gray-50 overflow-hidden mb-3">
                      <img
                        src={blog.image || "https://placehold.co/400x300"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#ffa015] text-black flex flex-col items-center justify-center font-black w-10 py-1 shadow-sm leading-tight rounded-sm">
                        <span className="text-xs">{blogDate.getDate()}</span>
                        <span className="text-[9px] uppercase font-bold">
                          {blogDate.toLocaleString("en-US", { month: "short" })}
                        </span>
                      </div>
                    </div>
                    {blog.category && (
                      <span className="text-[10px] font-extrabold text-[#ffa015] uppercase tracking-wider mb-1 block">
                        {blog.category.title}
                      </span>
                    )}
                    <h3 className="text-sm font-black text-black tracking-tight leading-snug line-clamp-2 hover:underline">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 mt-1.5 leading-normal">
                      {blog.excerpt ||
                        "Discover expert technical guidance and product packaging setups directly from our warehouse teams."}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. POPULAR READS */}
        {popularReads.length > 0 && (
          <div className="mt-12 bg-white border border-gray-200/80 rounded-sm p-6">
            <div className="border-b border-gray-100 pb-2 mb-6">
              <span className="bg-[#ffa015] text-black text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-sm">
                WRITER'S PICK
              </span>
              <h2 className="text-xl font-black text-black mt-2">
                Popular reads
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularReads.map((blog) => (
                <div
                  key={blog._id}
                  className="flex space-x-3 items-center group bg-gray-50/50 p-2 rounded-sm border border-gray-100"
                >
                  <img
                    src={blog.image || "https://placehold.co/150"}
                    alt={blog.title}
                    className="w-16 h-16 object-cover rounded-sm bg-gray-200 flex-shrink-0"
                  />
                  <div>
                    {blog.category && (
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-0.5">
                        {blog.category.title}
                      </span>
                    )}
                    <h4 className="text-xs font-black text-black line-clamp-2 leading-snug hover:text-[#ffa015] transition-colors">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. ALL ARTICLES SECTION */}
        <div className="mt-12 bg-white border border-gray-200/80 rounded-sm p-6 md:p-8">
          <div className="border-b border-gray-100 pb-4 mb-8">
            <h2 className="text-2xl font-black text-black tracking-tight">
              All articles
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Browse the full archive — {blogs.length} stories and counting.
            </p>
          </div>

          {allArticles.length === 0 ? (
            <p className="text-sm text-gray-400 italic text-center py-6">
              No articles found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {allArticles.map((blog) => {
                const blogDate = new Date(blog.createdAt);
                return (
                  <article
                    key={blog._id}
                    className="flex flex-col h-full border-b border-gray-100/70 pb-6 group"
                  >
                    <div className="h-52 w-full relative bg-gray-50 overflow-hidden mb-4 rounded-sm">
                      <img
                        src={blog.image || "https://placehold.co/600x400"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#ffa015] text-black flex flex-col items-center justify-center font-black w-9 py-1 shadow-sm leading-tight rounded-sm">
                        <span className="text-xs">{blogDate.getDate()}</span>
                        <span className="text-[8px] uppercase font-bold">
                          {blogDate.toLocaleString("en-US", { month: "short" })}
                        </span>
                      </div>
                    </div>

                    {blog.category && (
                      <span className="text-[10px] font-extrabold text-[#ffa015] uppercase tracking-wider mb-1 block">
                        {blog.category.title}
                      </span>
                    )}

                    <h3 className="text-base font-black text-black tracking-tight leading-snug line-clamp-2 hover:underline">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-3 mt-2 leading-relaxed">
                      {blog.excerpt ||
                        "Read full analysis details regarding structural production engineering and material optimizations."}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
