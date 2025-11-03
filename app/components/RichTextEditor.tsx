'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useEffect, useState } from 'react';
import { 
  MdFormatBold, 
  MdFormatItalic, 
  MdFormatUnderlined,
  MdTitle,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdLink,
  MdImage,
  MdPhotoCamera,
  MdDelete,
  MdPreview
} from 'react-icons/md';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Start writing...' 
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none w-full focus:outline-none min-h-[400px] p-4',
      },
      handleKeyDown: (view, event) => {
        // Allow delete/backspace to work on images
        if (event.key === 'Delete' || event.key === 'Backspace') {
          const { state, dispatch } = view;
          const { selection } = state;
          
          // Check if there's a node at the selection position
          const node = state.doc.nodeAt(selection.from);
          
          if (node && node.type.name === 'image') {
            // Delete the image node
            const pos = selection.from;
            const tr = state.tr.delete(pos, pos + node.nodeSize);
            dispatch(tr);
            return true;
          }
          
          // Try to find image at cursor position
          const $pos = state.selection.$from;
          const nodeAtPos = $pos.node();
          
          if (nodeAtPos && nodeAtPos.type.name === 'image') {
            const pos = $pos.before();
            const tr = state.tr.delete(pos, pos + nodeAtPos.nodeSize);
            dispatch(tr);
            return true;
          }
        }
        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          const reader = new FileReader();

          if (file.type.startsWith('image/')) {
            reader.onload = (e) => {
              const imageUrl = e.target?.result as string;
              const { schema } = view.state;
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });

              if (coordinates && imageUrl) {
                const node = schema.nodes.image.create({ src: imageUrl });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              }
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event, slice) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find((item) => item.type.startsWith('image/'));

        if (imageItem) {
          const file = imageItem.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const imageUrl = e.target?.result as string;
              if (imageUrl && editor) {
                editor.chain().focus().setImage({ src: imageUrl }).run();
              }
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  // Update editor content when external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;

    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleImageUpload = useCallback(() => {
    if (!editor) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [editor]);

  const deleteImage = useCallback(() => {
    if (!editor) return;
    
    const { state } = editor;
    const { selection } = state;
    
    // Check if there's a node at the selection position
    const node = state.doc.nodeAt(selection.from);
    
    if (node && node.type.name === 'image') {
      // Delete the image node
      const pos = selection.from;
      editor.chain().focus().deleteRange({ from: pos, to: pos + node.nodeSize }).run();
      return;
    }
    
    // Try to find image at cursor position
    const $pos = state.selection.$from;
    const nodeAtPos = $pos.node();
    
    if (nodeAtPos && nodeAtPos.type.name === 'image') {
      // Delete the image node
      const pos = $pos.before();
      editor.chain().focus().deleteRange({ from: pos, to: pos + nodeAtPos.nodeSize }).run();
      return;
    }
    
    // If no image found, try to delete current selection
    if (!selection.empty) {
      editor.chain().focus().deleteSelection().run();
    }
  }, [editor]);

  if (!editor || !mounted) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <div className="min-h-[400px] p-4 flex items-center justify-center">
          <div className="text-gray-400">Loading editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white w-full">
      {/* Toolbar */}
      <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap items-center gap-2 w-full">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive('bold') ? 'bg-gray-300' : ''
            }`}
            title="Bold"
          >
            <MdFormatBold className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive('italic') ? 'bg-gray-300' : ''
            }`}
            title="Italic"
          >
            <MdFormatItalic className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive('underline') ? 'bg-gray-300' : ''
            }`}
            title="Underline"
          >
            <MdFormatUnderlined className="w-5 h-5" />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''
            }`}
            title="Heading 1"
          >
            <span className="text-sm font-semibold">H1</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''
            }`}
            title="Heading 2"
          >
            <span className="text-sm font-semibold">H2</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''
            }`}
            title="Heading 3"
          >
            <span className="text-sm font-semibold">H3</span>
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive('bulletList') ? 'bg-gray-300' : ''
            }`}
            title="Bullet List"
          >
            <MdFormatListBulleted className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive('orderedList') ? 'bg-gray-300' : ''
            }`}
            title="Numbered List"
          >
            <MdFormatListNumbered className="w-5 h-5" />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetTextAlign().run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              !editor.isActive({ textAlign: 'center' }) && 
              !editor.isActive({ textAlign: 'right' }) && 
              !editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-300' : ''
            }`}
            title="Align Left"
          >
            <MdFormatAlignLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''
            }`}
            title="Align Center"
          >
            <MdFormatAlignCenter className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''
            }`}
            title="Align Right"
          >
            <MdFormatAlignRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-300' : ''
            }`}
            title="Justify"
          >
            <MdFormatAlignJustify className="w-5 h-5" />
          </button>
        </div>

        {/* Link */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={setLink}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              editor.isActive('link') ? 'bg-gray-300' : ''
            }`}
            title="Insert Link"
          >
            <MdLink className="w-5 h-5" />
          </button>
        </div>

        {/* Images */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={handleImageUpload}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Upload Image"
          >
            <MdPhotoCamera className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={addImage}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Insert Image from URL"
          >
            <MdImage className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={deleteImage}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Delete Selected Image (Click on image first, then click this button or press Delete/Backspace)"
          >
            <MdDelete className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Toggle */}
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => {
              const previewWindow = window.open('', '_blank');
              if (previewWindow) {
                previewWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <title>Preview</title>
                      <style>
                        body { 
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                          max-width: 800px;
                          margin: 40px auto;
                          padding: 20px;
                          line-height: 1.8;
                        }
                        img { max-width: 100%; height: auto; border-radius: 8px; margin: 1.5rem 0; }
                        h1, h2, h3 { margin-top: 2rem; margin-bottom: 1rem; }
                        a { color: #2563eb; text-decoration: underline; }
                      </style>
                    </head>
                    <body>
                      ${editor.getHTML()}
                    </body>
                  </html>
                `);
                previewWindow.document.close();
              }
            }}
            className="px-3 py-1.5 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors"
            title="Preview in New Window"
          >
            <MdPreview className="w-5 h-5 inline mr-1" />
            Preview
          </button>
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
