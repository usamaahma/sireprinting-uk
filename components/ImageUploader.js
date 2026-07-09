"use client";
import { Upload, X, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ImageUploader({
  label,
  value,
  onChange,
  multiple = false,
}) {
  const [isUploading, setIsUploading] = useState(false);

  // Cloudinary Details (Settings se check karein)
  const CLOUD_NAME = "dwrpho27o"; // <--- Apna Cloud Name yahan likhein
  const UPLOAD_PRESET = "sireprinting"; // <--- Apna Preset Name yahan likhein

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url; // Yeh humein image ka direct link dega
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);

      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        onChange([...currentValues, ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
    } catch (error) {
      console.error("Cloudinary Error:", error);
      alert("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    if (multiple) {
      onChange(value.filter((_, index) => index !== indexToRemove));
    } else {
      onChange("");
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
        {label} {multiple && "(Multiple)"}
      </label>

      <div className={`border-2 border-dashed rounded-3xl p-4 transition-all bg-slate-50 min-h-[160px] ${isUploading ? 'border-orange-400 animate-pulse' : 'border-slate-200 hover:border-orange-400'}`}>
        
        {/* Images Preview Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {multiple && Array.isArray(value)
            ? value.map((img, idx) => (
                <div key={idx} className="relative h-24">
                  <img
                    src={img}
                    className="w-full h-full object-cover rounded-xl border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-lg"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))
            : !multiple &&
              value && (
                <div className="relative h-32 w-full col-span-2">
                  <img
                    src={value}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage()}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
        </div>

        {/* Upload Button logic */}
        {(!value || multiple) && (
          <label className="flex flex-col items-center cursor-pointer py-4">
            {isUploading ? (
              <>
                <Loader2 className="text-orange-500 mb-2 animate-spin" size={28} />
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-tight">
                  Uploading to Cloud...
                </span>
              </>
            ) : (
              <>
                <Upload className="text-slate-300 mb-2" size={28} />
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {multiple ? "Add More Images" : "Upload Media"}
                </span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
              accept="image/*"
              multiple={multiple}
              disabled={isUploading}
            />
          </label>
        )}
      </div>
    </div>
  );
}
