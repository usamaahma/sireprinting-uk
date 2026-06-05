"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  ImageIcon,
  Undo,
  Redo,
} from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-slate-50 sticky top-0 z-10">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive("bold") ? "bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-600"}`}
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive("italic") ? "bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-600"}`}
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded ${editor.isActive("underline") ? "bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-600"}`}
      >
        <UnderlineIcon size={18} />
      </button>
      <div className="w-[1px] h-6 bg-slate-300 mx-1 self-center" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded ${editor.isActive("heading", { level: 1 }) ? "bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-600"}`}
      >
        <Heading1 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-600"}`}
      >
        <Heading2 size={18} />
      </button>
      <div className="w-[1px] h-6 bg-slate-300 mx-1 self-center" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-600"}`}
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-600"}`}
      >
        <ListOrdered size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${editor.isActive("blockquote") ? "bg-slate-800 text-white" : "hover:bg-slate-200 text-slate-600"}`}
      >
        <Quote size={18} />
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Enter Image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
        className="p-2 rounded hover:bg-slate-200 text-slate-600"
      >
        <ImageIcon size={18} />
      </button>
      <div className="flex-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 hover:bg-slate-200 text-slate-400"
      >
        <Undo size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 hover:bg-slate-200 text-slate-400"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    immediatelyRender: false, // Fixes SSR/Hydration Error
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[250px] p-5",
      },
    },
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden focus-within:ring-4 ring-orange-50 transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
