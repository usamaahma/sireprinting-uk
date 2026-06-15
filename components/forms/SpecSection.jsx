import { useFieldArray, useFormContext } from "react-hook-form";

export default function SpecSection({ name, label }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `specifications.${name}`,
  });

  return (
    <div className="border rounded-lg p-4 bg-white mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-700 uppercase text-sm tracking-wider">
          {label}
        </h3>
        <button
          type="button"
          onClick={() => append({ heading: "", description: [] })}
          className="text-blue-500 text-xs"
        >
          + Add Group
        </button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-4 p-3 border-l-4 border-blue-200 bg-gray-50"
        >
          <input
            {...register(`specifications.${name}.${index}.heading`)}
            placeholder="Heading (e.g. Thickness)"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Descriptions (One per line)"
            className="w-full p-2 border rounded text-sm"
            onBlur={(e) => {
              const lines = e.target.value
                .split("\n")
                .filter((l) => l.trim() !== "");
              setValue(`specifications.${name}.${index}.description`, lines);
            }}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-400 text-xs mt-1"
          >
            Remove Group
          </button>
        </div>
      ))}
    </div>
  );
}
