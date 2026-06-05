"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { subcategoryService } from "@/services/api";
import SimpleForm from "@/components/forms/SimpleForm";
import ProductForm from "@/components/forms/ProductForm";
import toast, { Toaster } from "react-hot-toast";

export default function NewSubcategory() {
  const [activeTab, setActiveTab] = useState("simple");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      price: "",
      salePrice: "",
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

  // Reset form when switching tabs
  useEffect(() => {
    const currentValues = methods.getValues();
    methods.reset(currentValues);
  }, [activeTab, methods]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const finalData = {
        ...data,
        display_as: activeTab, // "simple" or "product"
      };

      // Remove price fields for simple mode
      if (activeTab === "simple") {
        delete finalData.price;
        delete finalData.salePrice;
        finalData.variants = [];
      }

      console.log("Submitting:", {
        title: finalData.title,
        display_as: finalData.display_as,
      });

      const res = await subcategoryService.create(finalData);

      console.log("Response:", res);

      if (res.success) {
        toast.success(
          `Subcategory created successfully as ${activeTab === "simple" ? "Simple" : "Product"} mode!`,
        );
        setTimeout(() => {
          router.push("/admin/subcategories");
        }, 1500);
      } else {
        toast.error(res.error || "Failed to create subcategory");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <Toaster position="top-right" />

      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-gray-500 hover:text-black transition-all"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">Add New Subcategory</h1>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex bg-gray-200 p-1 rounded-lg w-fit mb-8 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveTab("simple")}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === "simple"
              ? "bg-white shadow text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Simple Mode (Grid View)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("product")}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === "product"
              ? "bg-white shadow text-purple-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Product Mode (Direct Sale)
        </button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            {activeTab === "simple" ? (
              <div>
                <p className="text-sm text-gray-500 mb-6 italic">
                  Note: In Simple Mode, this subcategory will act as a parent
                  for other products.
                </p>
                <SimpleForm />
              </div>
            ) : (
              <div>
                <p className="text-sm text-purple-500 mb-6 italic font-medium">
                  Note: In Product Mode, this subcategory will function as a
                  standalone product page with variants and pricing.
                </p>
                <ProductForm />
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="sticky bottom-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all text-white flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : activeTab === "simple"
                    ? "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
                    : "bg-purple-600 hover:bg-purple-700 active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Processing Build...
                </>
              ) : (
                `Save as ${activeTab === "simple" ? "Subcategory" : "Hybrid Product"}`
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
