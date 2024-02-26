'use client'

import { type Editor } from '@tiptap/react';
import { Toggle } from '@/app/components/ui/toggle';
import { List, Heading, Bold, Italic, ListOrdered, Strikethrough } from 'lucide-react';

type Props = {
  editor: Editor | null;
}


const Toolbar = ({ editor }: Props) => {
  if (!editor) return null;

  return (
    <div>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2}).run()}
      >
        <Heading size={18} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={18} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={18} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("mark")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={18} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={18} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={18} />
      </Toggle>
    </div>
  )
}

export default Toolbar
