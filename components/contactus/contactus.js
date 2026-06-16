"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-10 pt-28 md:pt-36 mt-8 font-sans">
      {/* pt-28 md:pt-36 aur mt-8 lagane se ab navbar se safe distance ban gaya hai */}
      <div className="max-w-5xl w-full flex flex-col items-center space-y-8">
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-normal text-black tracking-tight text-center">
          Message US!
        </h1>

        {/* Content Split: Left Form, Right Info */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start pt-4">
          
          {/* LEFT COLUMN: Input Form */}
          <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4 w-full">
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-white border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-white border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full bg-white border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="6"
                className="w-full bg-white border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                required
              ></textarea>
            </div>

            {/* Centered Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-medium text-sm py-2.5 px-10 transition-colors uppercase tracking-wider"
              >
                Send
              </button>
            </div>
          </form>

          {/* RIGHT COLUMN: Contact Info details */}
          <div className="md:col-span-5 space-y-6 pt-2 md:pt-4">
            
            {/* Phone Info */}
            <div className="flex items-center space-x-4 group">
              <div className="text-gray-600 group-hover:text-black transition-colors">
                <Phone size={32} className="transform -rotate-90 stroke-[1.5]" />
              </div>
              <a 
                href="tel:+13322224710" 
                className="text-lg md:text-xl text-[#4A779D] hover:underline tracking-wide font-normal"
              >
                (332) 222-4710
              </a>
            </div>

            {/* Email Info */}
            <div className="flex items-center space-x-4 group">
              <div className="text-gray-600 group-hover:text-black transition-colors">
                <Mail size={32} className="stroke-[1.5]" />
              </div>
              <a 
                href="mailto:support@sireprinting.com" 
                className="text-lg md:text-xl text-[#4A779D] hover:underline tracking-wide font-normal"
              >
                support@sireprinting.com
              </a>
            </div>

            {/* Address Info */}
            <div className="flex items-start space-x-4 group">
              <div className="text-gray-600 group-hover:text-black transition-colors pt-1">
                <MapPin size={32} className="stroke-[1.5]" />
              </div>
              <p className="text-lg md:text-xl text-gray-600 tracking-wide font-normal leading-relaxed">
                626 92nd Street Brooklyn NY 11220
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}