'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';

const Tiptap = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: 'rounded-md border min-h-[150px] border-border bg-background',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    }
  })

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} placeholder='Enter job description' />
    </div>
  )
}

export default Tiptap;
