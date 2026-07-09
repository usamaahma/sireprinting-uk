"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', message: ''
  });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: 'Sending...', type: 'info' });

    try {
      const res = await fetch('/api/contactus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, message: "Message sent successfully!", type: 'success' });
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ loading: false, message: data.message || "Failed to send.", type: 'error' });
      }
    } catch (error) {
      setStatus({ loading: false, message: "Server error, try again later.", type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-10 pt-28 md:pt-36 mt-8 font-sans">
      <div className="max-w-5xl w-full flex flex-col items-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-normal text-black tracking-tight text-center">Message US!</h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start pt-4">
          <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4 w-full">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full bg-white border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-white border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors" required />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full bg-white border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors" required />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows="6" className="w-full bg-white border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors resize-none" required></textarea>

            <div className="flex flex-col items-center pt-2">
              <button type="submit" disabled={status.loading} className="bg-black hover:bg-gray-800 text-white font-medium text-sm py-2.5 px-10 transition-colors uppercase tracking-wider disabled:opacity-50">
                {status.loading ? "Sending..." : "Send"}
              </button>
              {status.message && (
                <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {status.message}
                </p>
              )}
            </div>
          </form>

          <div className="md:col-span-5 space-y-6 pt-2 md:pt-4">
            <div className="flex items-center space-x-4"><Phone size={32} className="text-gray-600 transform -rotate-90" /><a href="tel:+13322224710" className="text-lg text-[#4A779D]">(332) 222-4710</a></div>
            <div className="flex items-center space-x-4"><Mail size={32} className="text-gray-600" /><a href="mailto:support@sireprinting.com" className="text-lg text-[#4A779D]">support@sireprinting.com</a></div>
            <div className="flex items-start space-x-4"><MapPin size={32} className="text-gray-600" /><p className="text-lg text-gray-600">626 92nd Street Brooklyn NY 11220</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}