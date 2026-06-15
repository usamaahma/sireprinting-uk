"use client";
import { useEffect, useState } from "react";
import { Layers, Box, ShoppingCart, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    orders: 0,
    revenue: "0.00"
  });

  // Future mein yahan real API se data fetch karenge
  useEffect(() => {
    // Demo data for now
    setStats({
      categories: 12,
      products: 145,
      orders: 48,
      revenue: "12,450"
    });
  }, []);

  const cards = [
    { name: "Total Categories", value: stats.categories, icon: <Layers size={24} />, color: "bg-blue-500" },
    { name: "Total Products", value: stats.products, icon: <Box size={24} />, color: "bg-orange-500" },
    { name: "Recent Orders", value: stats.orders, icon: <ShoppingCart size={24} />, color: "bg-green-500" },
    { name: "Total Revenue", value: `$${stats.revenue}`, icon: <TrendingUp size={24} />, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 font-medium mt-1">Khush-amdeed! Yahan aapki website ka poora hisab kitab hai.</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.name}</p>
                <h3 className="text-2xl font-black text-slate-800 mt-1">{card.value}</h3>
              </div>
              <div className={`${card.color} text-white p-3 rounded-xl shadow-lg`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* QUICK ACTIONS OR RECENT ACTIVITY AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-slate-50 rounded-xl text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-all border border-transparent hover:border-orange-100 text-left">
              + Add New Product
            </button>
            <button className="p-4 bg-slate-50 rounded-xl text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-all border border-transparent hover:border-orange-100 text-left">
              + New Category
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center border-dashed border-2">
            <p className="text-slate-400 text-sm italic">Recent activity graph will appear here...</p>
        </div>
      </div>
    </div>
  );
}