"use client";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function FAQSection({ name, label, isQuick = false }) {
  const { control, register, setValue, watch } = useFormContext();

  // useFieldArray dynamic inputs (Add/Remove) ko handle karta hai
  const { fields, append, remove } = useFieldArray({
    control,
    name: name, // 'faqs' ya 'quickFaqs'
  });

  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <div className="border rounded-xl p-6 bg-gray-50 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">{label}</h3>
        <button
          type="button"
          onClick={() =>
            append(
              isQuick
                ? { question: "", answer: [] }
                : { question: "", answer: "" },
            )
          }
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-200 transition"
        >
          + Add FAQ
        </button>
      </div>

      {fields.length === 0 && (
        <p className="text-gray-400 text-sm italic text-center py-4">
          No FAQs added yet.
        </p>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 bg-white border rounded-lg shadow-sm relative group"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition"
              title="Remove FAQ"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="grid grid-cols-1 gap-3 pr-8">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Question
                </label>
                <input
                  {...register(`${name}.${index}.question`)}
                  placeholder="e.g. What is the production time?"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Answer
                </label>
                {isQuick ? (
                  /* Agar Quick FAQ hai toh multiple lines (array) support karega */
                  <textarea
                    placeholder="Enter points (One per line)"
                    className={`${inputStyle} h-24`}
                    onBlur={(e) => {
                      const lines = e.target.value
                        .split("\n")
                        .filter((l) => l.trim() !== "");
                      setValue(`${name}.${index}.answer`, lines);
                    }}
                    defaultValue={
                      Array.isArray(watch(`${name}.${index}.answer`))
                        ? watch(`${name}.${index}.answer`).join("\n")
                        : ""
                    }
                  />
                ) : (
                  /* Normal FAQ ke liye single string answer */
                  <textarea
                    {...register(`${name}.${index}.answer`)}
                    placeholder="Enter answer detail..."
                    className={`${inputStyle} h-24`}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
