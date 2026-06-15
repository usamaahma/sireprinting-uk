"use client";
import { useEffect, useState } from "react";
import { subcategoryService } from "@/services/api";
import Link from "next/link";

export default function SubcategoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await subcategoryService.getAll();
    if (res.success) setItems(res.data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await subcategoryService.delete(id);
      if (res.success) {
        // List ko foran update karne ke liye
        setItems((prev) => prev.filter((item) => item._id !== id));
        alert("Deleted successfully!");
      } else {
        alert("Error: " + res.error);
      }
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading Subcategories...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Subcategories</h1>
        <Link
          href="/admin/subcategories/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition shadow-md"
        >
          + Add New Subcategory
        </Link>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600 text-sm">Title</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Slug</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">
                Parent
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-blue-50 transition">
                  <td className="p-4 font-medium text-gray-800">
                    {item.title}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{item.slug}</td>
                  <td className="p-4 text-gray-600">
                    {item.parentCategory || "—"}
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <Link
                      href={`/admin/subcategories/edit/${item._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400">
                  No subcategories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
