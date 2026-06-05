"use client";
import { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  X,
  Save,
  Loader2,
  Globe,
  LayoutGrid,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUploader from "@/components/ImageUploader";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const initialFormState = {
    title: "",
    slug: "",
    shortdescription: "",
    image: "",
    featuredImage: "",
    description: "",
    seoTitle: "",
    seoKeywords: "",
    seoDescription: "",
    schema: "",
    faqs: [{ question: "", answer: "" }],
  };
  const [formData, setFormData] = useState(initialFormState);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Database connection failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const tId = toast.loading(isEditing ? "Updating..." : "Saving Category...");

    try {
      const res = await fetch(
        isEditing ? `/api/categories/${currentId}` : "/api/categories",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (res.ok) {
        toast.success(isEditing ? "Category Updated!" : "Category Created!", {
          id: tId,
        });
        setIsModalOpen(false);
        fetchCategories();
      } else {
        const err = await res.json();
        toast.error(err.error || "Something went wrong", { id: tId });
      }
    } catch (err) {
      toast.error("Network Error!", { id: tId });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Are you sure?")) return;
    const tId = toast.loading("Deleting...");
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Deleted!", { id: tId });
        fetchCategories();
      } else {
        toast.error("Failed to delete", { id: tId });
      }
    } catch (err) {
      toast.error("Error!", { id: tId });
    }
  };

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div>
          <h1 className="text-4xl font-black text-slate-800 italic uppercase tracking-tighter">
            Categories
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
            Total: {categories.length} Records
          </p>
        </div>
        <button
          onClick={() => {
            setFormData(initialFormState);
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-orange-200 transition-all flex items-center gap-3"
        >
          <Plus size={20} /> NEW CATEGORY
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Filter by title..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-orange-50"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] bg-slate-50/50 border-b border-slate-100">
              <th className="p-8 text-left">Visual & Name</th>
              <th className="p-8 text-left">SEO & Content</th>
              <th className="p-8 text-right">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan="3" className="p-20 text-center">
                  <Loader2
                    className="animate-spin inline text-orange-500"
                    size={40}
                  />
                </td>
              </tr>
            ) : (
              categories
                .filter((c) =>
                  c.title?.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((cat) => (
                  <tr
                    key={cat._id}
                    className="group hover:bg-slate-50/80 transition-all"
                  >
                    <td className="p-8 flex items-center gap-5">
                      <div className="h-20 w-20 rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-slate-100">
                        <img
                          src={cat.image || "https://via.placeholder.com/150"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-800 text-xl">
                          {cat.title}
                        </h3>
                        <p className="text-xs font-mono text-orange-500 uppercase tracking-tighter">
                          /{cat.slug}
                        </p>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex flex-col gap-2">
                        <span
                          className={`w-fit px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${cat.seoTitle ? "bg-emerald-100 text-emerald-600" : "bg-red-50 text-red-400"}`}
                        >
                          {cat.seoTitle ? "SEO Ready" : "SEO Missing"}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 ml-1">
                          {cat.faqs?.length || 0} FAQs Linked
                        </span>
                      </div>
                    </td>
                    <td className="p-8 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setFormData(cat);
                            setCurrentId(cat._id);
                            setIsEditing(true);
                            setIsModalOpen(true);
                          }}
                          className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => deleteCategory(cat._id)}
                          className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-slate-50 w-full max-w-5xl h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-8 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-50">
              <div>
                <h2 className="text-2xl font-black italic uppercase text-slate-800">
                  {isEditing ? "Modify Category" : "New Entry"}
                </h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Admin Control Panel
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-4 bg-slate-100 hover:bg-red-500 hover:text-white rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-12 space-y-12 pb-32">
              <div className="grid grid-cols-2 gap-8">
                <ImageUploader
                  label="Thumbnail Image"
                  value={formData.image}
                  onChange={(v) => setFormData({ ...formData, image: v })}
                />
                <ImageUploader
                  label="Banner Image"
                  value={formData.featuredImage}
                  onChange={(v) =>
                    setFormData({ ...formData, featuredImage: v })
                  }
                />
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Title
                    </label>
                    <input
                      required
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-orange-50 font-bold"
                      placeholder="e.g. Cardboard Boxes"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      URL Slug
                    </label>
                    <input
                      required
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-orange-50 font-mono text-orange-600"
                      placeholder="cardboard-boxes"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Short Description
                  </label>
                  <textarea
                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                    rows="3"
                    placeholder="Brief summary for listings..."
                    value={formData.shortdescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shortdescription: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase text-orange-500 tracking-widest ml-2">
                  WordPress Style Full Content
                </h3>
                <RichTextEditor
                  value={formData.description}
                  onChange={(val) =>
                    setFormData({ ...formData, description: val })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-slate-900 p-10 rounded-[3rem] space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-orange-400">
                    SEO Configuration
                  </h3>
                  <input
                    className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-orange-500 text-white"
                    placeholder="SEO Title"
                    value={formData.seoTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, seoTitle: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-orange-500 text-white"
                    placeholder="SEO Description"
                    rows="4"
                    value={formData.seoDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seoDescription: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-widest text-orange-500">
                      FAQ Manager
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          faqs: [
                            ...formData.faqs,
                            { question: "", answer: "" },
                          ],
                        })
                      }
                      className="bg-orange-50 text-orange-500 px-4 py-2 rounded-xl text-[10px] font-black"
                    >
                      + ADD NEW
                    </button>
                  </div>
                  <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2">
                    {formData.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="p-4 bg-slate-50 rounded-2xl space-y-2 relative"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              faqs: formData.faqs.filter((_, idx) => idx !== i),
                            })
                          }
                          className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                        >
                          <X size={14} />
                        </button>
                        <input
                          className="w-full bg-white border-none p-3 rounded-lg text-sm font-bold"
                          placeholder="Question"
                          value={faq.question}
                          onChange={(e) => {
                            const f = [...formData.faqs];
                            f[i].question = e.target.value;
                            setFormData({ ...formData, faqs: f });
                          }}
                        />
                        <textarea
                          className="w-full bg-white border-none p-3 rounded-lg text-sm"
                          placeholder="Answer"
                          value={faq.answer}
                          onChange={(e) => {
                            const f = [...formData.faqs];
                            f[i].answer = e.target.value;
                            setFormData({ ...formData, faqs: f });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="fixed bottom-0 right-0 w-full max-w-5xl p-8 bg-white/90 backdrop-blur-md border-t border-slate-100 flex gap-4 z-[60]">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-orange-500 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-orange-200 hover:bg-orange-600 transition-all flex items-center justify-center gap-4"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save size={24} />
                  )}{" "}
                  {isEditing ? "Update Database" : "Publish to Live Site"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
