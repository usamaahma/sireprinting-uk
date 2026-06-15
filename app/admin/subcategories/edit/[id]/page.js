"use client";
import { useEffect, useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { subcategoryService } from "@/services/api";
import SimpleForm from "@/components/forms/SimpleForm";
import ProductForm from "@/components/forms/ProductForm";
import toast, { Toaster } from "react-hot-toast";

export default function EditSubcategory() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("simple");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const methods = useForm({
    defaultValues: {
      title: "",
      slug: "",
      parentCategory: "",
      shortDescription: "",
      fullDescription: "",
      image: "",
      featuredImage: "",
      additionalImages: [],
      variants: [],
      faqs: [],
      quickFaqs: [],
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      schema: "",
      specifications: {
        material: [],
        colorModels: [],
        finishing: [],
        addon: [],
        coatingOption: [],
        turnaroundTime: [],
      },
    },
  });

  const loadData = useCallback(async () => {
    if (!id) return;
    setFetching(true);
    try {
      const res = await subcategoryService.getOne(id);
      console.log("Backend Se Aya Hua Data:", res);

      const subData = res.success ? res.data : res;

      if (subData && (subData._id || subData.slug)) {
        // 1. Pura data reset karein (Primary method)
        methods.reset(subData);

        // 2. Manual Force Sync (For stubborn fields like Rich Text & Selects)
        methods.setValue("fullDescription", subData.fullDescription || "");
        methods.setValue("parentCategory", subData.parentCategory || "");
        methods.setValue("shortDescription", subData.shortDescription || "");

        // 3. Nested Specifications Sync
        if (subData.specifications) {
          Object.keys(subData.specifications).forEach((key) => {
            methods.setValue(
              `specifications.${key}`,
              subData.specifications[key],
            );
          });
        }

        // 4. Mode Switch Logic
        if (subData.display_as) {
          setActiveTab(subData.display_as);
        } else if (subData.variants?.length > 0 || subData.sku) {
          setActiveTab("product");
        }

        console.log("Form Fields Forcefully Updated");
      } else {
        toast.error("Data fetch ho gaya par format ghalat hai!");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Database se rabta nahi ho saka!");
    } finally {
      setFetching(false);
    }
  }, [id, methods]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Data cleaning before sending to MongoDB
      const finalData = {
        ...data,
        display_as: activeTab,
      };

      const res = await subcategoryService.update(id, finalData);

      if (res.success) {
        toast.success("Mubarak ho! Data update ho gaya.");
        router.refresh();
        setTimeout(() => {
          router.push("/admin/subcategories");
        }, 1500);
      } else {
        toast.error(res.error || "Update fail ho gaya");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-bold text-gray-500 tracking-tighter uppercase">
          Data Load Ho Raha Hai...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 min-h-screen">
      <Toaster position="top-center" />

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-sm hover:bg-black hover:text-white transition-all"
          >
            ←
          </button>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Edit <span className="text-purple-600">Subcategory</span>
          </h1>
        </div>
      </div>

      {/* Tabs / Mode Switcher */}
      <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl mb-10 border border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("simple")}
          className={`px-10 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === "simple"
              ? "bg-white text-blue-600 shadow-xl"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          SIMPLE GRID
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("product")}
          className={`px-10 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === "product"
              ? "bg-white text-purple-600 shadow-xl"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          HYBRID PRODUCT
        </button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-12">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {activeTab === "simple" ? <SimpleForm /> : <ProductForm />}
          </div>

          {/* Persistent Save Bar */}
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50">
            <div className="bg-gray-900/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white/10 flex items-center justify-between">
              <div className="pl-4">
                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Editing Mode
                </span>
                <span className="text-white font-medium">
                  {activeTab.toUpperCase()}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                  loading
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : activeTab === "simple"
                      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20"
                      : "bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-900/20"
                }`}
              >
                {loading ? "Saving..." : "Update Database"}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>

      {/* Spacing for fixed bar */}
      <div className="h-32"></div>
    </div>
  );
}
