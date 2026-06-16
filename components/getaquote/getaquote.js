"use client";

import React, { useState } from 'react';
import { Upload, CheckCircle2, Truck, RefreshCw, Layers, ShieldCheck, Clock, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Country Codes List
const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+1', country: 'CA', flag: '🇨🇦' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+92', country: 'PK', flag: '🇵🇰' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
];

// Luxury Icons Features Data with custom pop-up/tooltip text
const features = [
  { 
    icon: <Layers size={28} className="text-[#FD7E14]" />, 
    title: "No Die & Plate Charges", 
    desc: "We don't charge any setup or plate costs for your custom structural designs." 
  },
  { 
    icon: <ShieldCheck size={28} className="text-[#FD7E14]" />, 
    title: "Customer Satisfaction", 
    desc: "100% premium quality guaranteed with active design support and revisions." 
  },
  { 
    icon: <Truck size={28} className="text-[#FD7E14]" />, 
    title: "Free Shipping", 
    desc: "Fast and complimentary secure secure shipping across the USA and selected regions." 
  },
  { 
    icon: <RefreshCw size={28} className="text-[#FD7E14]" />, 
    title: "Starting from 100 boxes", 
    desc: "Low Minimum Order Quantity (MOQ) to fully support startups and scale-ups." 
  },
  { 
    icon: <CheckCircle2 size={28} className="text-[#FD7E14]" />, 
    title: "Fully Customizable", 
    desc: "Custom size, shape, material thickness, internal inserts, and ultimate finishes." 
  },
  { 
    icon: <Clock size={28} className="text-[#FD7E14]" />, 
    title: "Quick Turnaround Time", 
    desc: "Rapid production cycles delivering within 8 to 10 business days." 
  },
];

export default function QuotePage() {
  const [selectedCountry, setSelectedCountry] = useState('+1');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // File Upload Handlers
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-10 pt-32 md:pt-44 font-sans selection:bg-[#FD7E14] selection:text-black">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Content & Features */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight tracking-tight">
              Get your <span className="text-[#FD7E14]">FREE Quote</span> Over Just a Few Clicks
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Every company needs different quantities of customized boxes depending upon their company size and target market demand. You can get the quantity you want by filling out our requirement form. Our packaging designers will work on your packaging requirement and gives you the best quotation suitable to your budget whether you buy a single or bulk custom boxes.
            </p>
          </div>

          {/* Luxury Features Grid with Hover Pop-up Tooltips */}
          <div className="grid grid-cols-3 gap-y-10 gap-x-6 pt-6 border-t border-gray-200">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="relative flex flex-col items-center text-center group"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Custom Pop-up / Tooltip */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -10, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute bottom-full mb-2 w-48 bg-black text-white text-[11px] p-3 rounded-xl shadow-xl z-20 pointer-events-none border border-gray-800"
                    >
                      <p className="font-bold text-[#FD7E14] mb-0.5">{feature.title}</p>
                      <p className="text-gray-300 leading-tight">{feature.desc}</p>
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Luxury Icon Container */}
                <motion.div 
                  whileHover={{ scale: 1.1, shadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                  className="w-16 h-16 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-sm transition-all cursor-pointer group-hover:border-[#FD7E14]/30"
                >
                  {feature.icon}
                </motion.div>
                
                <p className="text-[11px] font-bold text-gray-800 leading-tight mt-3 transition-colors group-hover:text-[#FD7E14]">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Form Card */}
        <div className="lg:col-span-7 bg-[#1A1A1A] text-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/[0.05]">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#FD7E14] border-b border-white/[0.08] pb-5 mb-6">
            Get a Quote
          </h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Section: User Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                User Info
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Full Name <span className="text-[#FD7E14]">*</span></label>
                  <input type="text" placeholder="Enter full name" className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FD7E14] focus:bg-[#2e2e2e] transition-all placeholder-gray-500" required />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Phone Number <span className="text-[#FD7E14]">*</span></label>
                  <div className="flex bg-[#262626] border border-white/[0.08] rounded-xl px-3 items-center focus-within:border-[#FD7E14] focus-within:bg-[#2e2e2e] transition-all">
                    {/* Country Code Dropdown */}
                    <div className="relative border-r border-white/[0.1] pr-2 mr-2">
                      <select 
                        value={selectedCountry} 
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="bg-transparent text-sm focus:outline-none pr-4 cursor-pointer font-medium appearance-none"
                      >
                        {countryCodes.map((c, i) => (
                          <option key={i} value={c.code} className="bg-[#262626] text-white">
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</div>
                    </div>
                    <input type="tel" placeholder="Enter phone number" className="w-full bg-transparent py-3 text-sm focus:outline-none placeholder-gray-500" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Email <span className="text-[#FD7E14]">*</span></label>
                  <input type="email" placeholder="Enter email" className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FD7E14] focus:bg-[#2e2e2e] transition-all placeholder-gray-500" required />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Company</label>
                  <input type="text" placeholder="Enter company" className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FD7E14] focus:bg-[#2e2e2e] transition-all placeholder-gray-500" />
                </div>
              </div>
            </div>

            {/* Section: Product Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-t border-white/[0.08] pt-5">
                Product Info
              </h3>
              
              {/* Dimensions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Length <span className="text-[#FD7E14]">*</span></label>
                  <input type="text" placeholder="Length" className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] transition-all placeholder-gray-500" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Width <span className="text-[#FD7E14]">*</span></label>
                  <input type="text" placeholder="Width" className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] transition-all placeholder-gray-500" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Height <span className="text-[#FD7E14]">*</span></label>
                  <input type="text" placeholder="Height" className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] transition-all placeholder-gray-500" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Unit <span className="text-[#FD7E14]">*</span></label>
                  <select className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] cursor-pointer transition-all">
                    <option className="bg-[#262626]">in</option>
                    <option className="bg-[#262626]">cm</option>
                    <option className="bg-[#262626]">mm</option>
                  </select>
                </div>
              </div>

              {/* Quantity & Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Quantity <span className="text-[#FD7E14]">*</span></label>
                  <select className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] cursor-pointer">
                    <option className="bg-[#262626]">100</option>
                    <option className="bg-[#262626]">250</option>
                    <option className="bg-[#262626]">500</option>
                    <option className="bg-[#262626]">1000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Material Type <span className="text-[#FD7E14]">*</span></label>
                  <select className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] cursor-pointer">
                    <option className="bg-[#262626]">Select material</option>
                    <option className="bg-[#262626]">Cardboard</option>
                    <option className="bg-[#262626]">Kraft</option>
                    <option className="bg-[#262626]">Corrugated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Printed Options</label>
                  <select className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] cursor-pointer">
                    <option className="bg-[#262626]">Select option</option>
                    <option className="bg-[#262626]">CMYK</option>
                    <option className="bg-[#262626]">PMS</option>
                    <option className="bg-[#262626]">No Printing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300">Printed Sides</label>
                  <select className="w-full bg-[#262626] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FD7E14] cursor-pointer">
                    <option className="bg-[#262626]">Select sides</option>
                    <option className="bg-[#262626]">Outside Only</option>
                    <option className="bg-[#262626]">Inside Only</option>
                    <option className="bg-[#262626]">Both Sides</option>
                  </select>
                </div>
              </div>

              <div>
                <textarea 
                  rows="3" 
                  placeholder="Describe your product specifications (dimensions L × W × H, colors, artwork requirements)" 
                  className="w-full bg-[#262626] border border-white/[0.08] rounded-xl p-4 text-sm focus:outline-none focus:border-[#FD7E14] focus:bg-[#2e2e2e] transition-all placeholder-gray-500 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Modern Drag & Drop File Uploader Area */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-gray-300">Attach Artwork / Reference Design</label>
              
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all relative ${
                  selectedFile ? 'border-green-500/50 bg-green-500/[0.02]' : 
                  isDragActive ? 'border-[#FD7E14] bg-[#FD7E14]/[0.05]' : 'border-white/[0.15] bg-[#222] hover:border-white/[0.25]'
                }`}
              >
                <input 
                  type="file" 
                  id="file-upload"
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.png"
                />

                {!selectedFile ? (
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-gray-400">
                      <Upload size={20} className={isDragActive ? "text-[#FD7E14] scale-110 transition-transform" : ""} />
                    </div>
                    <p className="text-sm font-medium">
                      <span className="text-[#FD7E14] hover:underline">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-[11px] text-gray-500">Supported formats: PDF, JPG, PNG (Max 25MB)</p>
                  </label>
                ) : (
                  // File Preview State when uploaded
                  <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.08] px-4 py-3 rounded-xl">
                    <div className="flex items-center space-x-3 text-left min-w-0">
                      <div className="p-2 bg-green-500/10 rounded-lg text-green-400 shrink-0">
                        <FileText size={18} />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-medium text-gray-200 truncate">{selectedFile.name}</p>
                        <p className="text-xs text-gray-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={removeFile}
                      className="p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Submit Action */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-[#FD7E14] hover:bg-[#f27107] active:scale-[0.99] text-black font-black py-4 px-6 rounded-xl text-center shadow-lg shadow-[#FD7E14]/10 transition-all uppercase tracking-wider text-sm"
              >
                Send Request
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}