import React from 'react';
// Agar aapke paas lucide-react install nahi hai toh pehle 'npm i lucide-react' kar lein
import { Upload, CheckCircle2, Truck, RefreshCw, Layers, ShieldCheck, Clock } from 'lucide-react';

export default function QuotePage() {
  return (
    // 'pt-24 md:pt-32' lagane se ab yeh navbar ke bilkul neeche se shuru hoga
   <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-10 pt-32 md:pt-44 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Content & Features */}
        <div className="lg:col-span-5 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Get your FREE Quote Over Just a Few Clicks
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Every company needs different quantities of customized boxes depending upon their company size and target market demand. You can get the quantity you want by filling out our requirement form. Our packaging designers will work on your packaging requirement and gives you the best quotation suitable to your budget whether you buy a single or bulk custom boxes.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-700">
                <Layers size={24} />
              </div>
              <p className="text-xs font-semibold text-gray-800 leading-tight">No Die & Plate Charges</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-700">
                <ShieldCheck size={24} />
              </div>
              <p className="text-xs font-semibold text-gray-800 leading-tight">Customer Satisfaction</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-700">
                <Truck size={24} />
              </div>
              <p className="text-xs font-semibold text-gray-800 leading-tight">Free Shipping</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-700">
                <RefreshCw size={24} />
              </div>
              <p className="text-xs font-semibold text-gray-800 leading-tight">Starting from 100 boxes</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-700">
                <CheckCircle2 size={24} />
              </div>
              <p className="text-xs font-semibold text-gray-800 leading-tight">Fully Customizable</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-700">
                <Clock size={24} />
              </div>
              <p className="text-xs font-semibold text-gray-800 leading-tight">Quick Turnaround Time</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Card */}
        <div className="lg:col-span-7 bg-[#333333] text-white p-6 md:p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-[#FD7E14] border-b border-gray-700 pb-4 mb-6">
            Get a Quote
          </h2>

          <form className="space-y-6">
            {/* Section: User Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                User Info <span className="text-xs lowercase text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded-full border border-gray-600 cursor-help">i</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter full name" className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Phone Number <span className="text-red-500">*</span></label>
                  <div className="flex bg-[#3d3d3d] border border-gray-600 rounded-xl px-3 items-center focus-within:border-[#FD7E14] transition-colors">
                    <span className="text-sm border-r border-gray-600 pr-2 flex items-center gap-1">🇺🇸 +1</span>
                    <input type="tel" placeholder="Enter phone number" className="w-full bg-transparent pl-2 py-2.5 text-sm focus:outline-none" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Email <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="Enter email" className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Company</label>
                  <input type="text" placeholder="Enter company" className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] transition-colors" />
                </div>
              </div>
            </div>

            {/* Section: Product Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider border-t border-gray-700 pt-4">
                Product Info
              </h3>
              
              {/* Dimensions: Length, Width, Height, Unit */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Length <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter length" className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FD7E14]" required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Width <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter width" className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FD7E14]" required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Height <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter height" className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FD7E14]" required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Unit <span className="text-red-500">*</span></label>
                  <select className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FD7E14] cursor-pointer">
                    <option>in</option>
                    <option>cm</option>
                    <option>mm</option>
                  </select>
                </div>
              </div>

              {/* Quantity, Material, Options, Sides */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Quantity <span className="text-red-500">*</span></label>
                  <select className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FD7E14] cursor-pointer">
                    <option>100</option>
                    <option>250</option>
                    <option>500</option>
                    <option>1000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Material Type <span className="text-red-500">*</span></label>
                  <select className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FD7E14] cursor-pointer">
                    <option>Select material</option>
                    <option>Cardboard</option>
                    <option>Kraft</option>
                    <option>Corrugated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Printed Options</label>
                  <select className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FD7E14] cursor-pointer">
                    <option>Select option</option>
                    <option>CMYK</option>
                    <option>PMS</option>
                    <option>No Printing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Printed Sides</label>
                  <select className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FD7E14] cursor-pointer">
                    <option>Select sides</option>
                    <option>Outside Only</option>
                    <option>Inside Only</option>
                    <option>Both Sides</option>
                  </select>
                </div>
              </div>

              {/* Textarea Description */}
              <div>
                <textarea 
                  rows="3" 
                  placeholder="Describe your product specifications (dimensions L × W × H, colors)" 
                  className="w-full bg-[#3d3d3d] border border-gray-600 rounded-xl p-4 text-sm focus:outline-none focus:border-[#FD7E14] placeholder-gray-400"
                ></textarea>
              </div>
            </div>

            {/* Bottom Section: Template info, Upload & Submit */}
            <div className="space-y-4 pt-2">
              <p className="text-xs text-gray-300">
                Ready to design your box?
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Upload Button */}
                <div className="w-full sm:w-auto">
                  <label className="flex items-center justify-center gap-2 bg-[#555555] hover:bg-[#666666] transition-colors text-sm px-5 py-2.5 rounded-xl cursor-pointer w-full sm:w-auto font-medium">
                    <Upload size={16} />
                    <span>Upload File</span>
                    <input type="file" className="hidden" />
                  </label>
                  <p className="text-[10px] text-gray-400 mt-1 text-center sm:text-left">
                    ⚠️ Supported formats: .pdf, .jpg, .png
                  </p>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full sm:w-2/3 bg-[#FD7E14] hover:bg-[#e06b0b] active:scale-[0.99] transition-all text-black font-bold py-3 px-6 rounded-xl text-center">
                  Send
                </button>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}