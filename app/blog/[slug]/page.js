import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

async function getBlogData(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/blogs/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

async function getLatestPosts() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/blogs?published=true`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.slice(0, 5);
}

export default async function BlogDetailsPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) notFound();

  const [blog, latestPosts] = await Promise.all([
    getBlogData(slug),
    getLatestPosts(),
  ]);

  if (!blog) notFound();

  return (
    <div className="min-h-screen bg-[#f7f9fa] pb-20 pt-24 text-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs Layout Wrapper */}
        <div className="pt-2 pb-4 border-b border-gray-200/60 mb-6">
          <Breadcrumbs />
        </div>

        {/* Hero Section Banner */}
        <div className="py-6 max-w-4xl mb-6">
          {blog.category && (
            <span className="text-[11px] font-extrabold tracking-widest text-[#ffa015] uppercase block mb-2">
              {blog.category.title}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center space-x-4 text-xs text-gray-500 font-semibold">
            <span>
              📅{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>💬 No Comments</span>
            <span>👁️ {blog.views || 0} Views</span>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT: Main Blog Post Content */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-sm border border-gray-200/80 shadow-sm">
            {blog.image && (
              <div className="w-full mb-8 overflow-hidden rounded-sm bg-gray-50">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-auto object-cover max-h-[450px]"
                />
              </div>
            )}

            {/* Rich HTML Content Rendering styling classes */}
            <div
              className="prose max-w-none text-gray-800 leading-relaxed space-y-6
                prose-headings:text-black prose-headings:font-black prose-headings:mt-8 prose-headings:mb-3
                prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2 prose-h3:text-xl prose-p:text-sm prose-p:text-gray-600 font-sans"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Dynamic Related Products Section (If available in layout) */}
            {blog.relatedProducts && blog.relatedProducts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-black text-black mb-4">
                  Related Products
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {blog.relatedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-sm"
                    >
                      <img
                        src={product.image || "https://placehold.co/100"}
                        alt=""
                        className="w-16 h-16 object-cover bg-white border border-gray-200 rounded-sm"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-black line-clamp-1">
                          {product.title}
                        </h4>
                        <p className="text-xs text-[#ffa015] font-black mt-1">
                          ${product.price || "Custom Quote"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Sharing block */}
            <div className="mt-12 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold text-white">
              <div className="bg-[#3b5998] py-2 px-3 rounded-sm cursor-pointer hover:opacity-90">
                Facebook
              </div>
              <div className="bg-[#1da1f2] py-2 px-3 rounded-sm cursor-pointer hover:opacity-90">
                Twitter
              </div>
              <div className="bg-[#ffa015] !text-black py-2 px-3 rounded-sm cursor-pointer hover:opacity-90">
                Email
              </div>
              <div className="bg-[#222222] py-2 px-3 rounded-sm cursor-pointer hover:opacity-90">
                Print
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: Latest post widget & Dynamic interactive form */}
          <div className="space-y-8">
            {/* Sidebar list items widget */}
            <div className="bg-white p-6 rounded-sm border border-gray-200/80 shadow-sm">
              <h3 className="text-black text-base font-black pb-2 border-b-2 border-[#ffa015] mb-4">
                Latest Post
              </h3>
              <div className="space-y-4">
                {latestPosts.map((post) => (
                  <div
                    key={post._id}
                    className="flex space-x-3 items-start group"
                  >
                    <img
                      src={post.image || "https://placehold.co/100"}
                      alt=""
                      className="w-12 h-12 object-cover rounded-sm bg-gray-100 flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-black text-black line-clamp-2 group-hover:text-[#ffa015] leading-snug transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <span className="text-[10px] text-gray-400 block mt-1">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form instant quote content layout styling */}
            <div className="bg-white p-6 rounded-sm border-t-4 border-[#ffa015] border-x border-b border-gray-200/80 shadow-sm">
              <h3 className="text-center text-lg font-black text-black tracking-tight mb-4">
                Get Instant Quote
              </h3>

              <form className="space-y-3 text-gray-800 text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Length"
                    className="p-2 rounded-sm w-full bg-gray-50 border border-gray-200 outline-none focus:border-[#ffa015]"
                  />
                  <input
                    type="text"
                    placeholder="Width"
                    className="p-2 rounded-sm w-full bg-gray-50 border border-gray-200 outline-none focus:border-[#ffa015]"
                  />
                  <input
                    type="text"
                    placeholder="Depth"
                    className="p-2 rounded-sm w-full bg-gray-50 border border-gray-200 outline-none focus:border-[#ffa015]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select className="p-2 rounded-sm w-full bg-gray-50 border border-gray-200 outline-none text-gray-400">
                    <option>Color</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="p-2 rounded-sm w-full bg-gray-50 border border-gray-200 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-2 rounded-sm w-full bg-gray-50 border border-gray-200 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="p-2 rounded-sm w-full bg-gray-50 border border-gray-200 outline-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 rounded-sm w-full bg-gray-50 border border-gray-200 outline-none block"
                />
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="p-2 rounded-sm w-full bg-gray-50 border border-gray-200 outline-none block resize-none"
                ></textarea>
                <button
                  type="button"
                  className="w-full bg-black text-white p-2.5 rounded-sm font-black hover:bg-[#ffa015] hover:text-black transition-colors tracking-wider text-xs uppercase"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
