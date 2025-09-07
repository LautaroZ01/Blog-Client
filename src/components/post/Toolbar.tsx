import { Editor } from '@tiptap/react'
import {
    FaBold,
    FaItalic,
    FaListUl,
    FaLink,
    FaCode,
    FaQuoteLeft,
    FaEraser,
    FaListOl
} from 'react-icons/fa'

type ToolbarProps = {
    editor: Editor | null
}

export default function Toolbar({ editor }: ToolbarProps) {
    if (!editor) return null

    return (
        <div className="flex gap-2 mb-4 px-4 w-full sticky top-0 z-10 bg-white p-2 shadow-md">
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                title="Negrita"
            >
                <FaBold className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                title="Cursiva"
            >
                <FaItalic className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                title="Lista con viñetas"
            >
                <FaListUl className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                title="Lista ordenada"
            >
                <FaListOl className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                title="Encabezado 1"
            >
                <p className='font-semibold'>H1</p>
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                title="Encabezado 2"
            >
                <p className='font-semibold'>H2</p>
            </button>
            <button
                type='button'
                onClick={() => {
                    const url = window.prompt('URL:')
                    if (url) {
                        editor.chain().focus().setLink({ href: url }).run()
                    }
                }}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('link') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                title="Insertar enlace"
            >
                <FaLink className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('code') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                title="Código"
            >
                <FaCode className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('blockquote') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                title="Cita"
            >
                <FaQuoteLeft className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                className="px-2 py-1 bg-gray-200 rounded cursor-pointer text-gray-700"
                title="Borrar formato"
            >
                <FaEraser className="w-4 h-4" />
            </button>
        </div>
    )
}
