import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[200px] border rounded-md p-3 bg-white focus:outline-none',
      },
    },
  });

  return (
    <div>
      <div className="mb-2 flex gap-2 flex-wrap">
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive('bold') ? 'font-bold text-[#d13f43]' : ''}>Bold</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive('italic') ? 'italic text-[#d13f43]' : ''}>Italic</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={editor?.isActive('bulletList') ? 'text-[#d13f43]' : ''}>• List</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={editor?.isActive('orderedList') ? 'text-[#d13f43]' : ''}>1. List</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={editor?.isActive('heading', { level: 2 }) ? 'font-bold text-[#d13f43]' : ''}>H2</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={editor?.isActive('heading', { level: 3 }) ? 'font-bold text-[#d13f43]' : ''}>H3</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
