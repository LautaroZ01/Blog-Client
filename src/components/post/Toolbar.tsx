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
    const optionOffStyle = 'bg-gray-100 text-gray-700'
    const optionOnStyle = 'bg-blue-500 text-white'

    if (!editor) return null

    return (
        <div className="flex items-center justify-between mb-4 px-4 w-full sticky top-0 z-10 bg-white/50 backdrop-blur-md p-2 shadow-md rounded-lg">
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('bold') ? optionOnStyle : optionOffStyle}`}
                title="Negrita"
            >
                <FaBold className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('italic') ? optionOnStyle : optionOffStyle}`}
                title="Cursiva"
            >
                <FaItalic className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('bulletList') ? optionOnStyle : optionOffStyle}`}
                title="Lista con viñetas"
            >
                <FaListUl className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('orderedList') ? optionOnStyle : optionOffStyle}`}
                title="Lista ordenada"
            >
                <FaListOl className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('heading', { level: 1 }) ? optionOnStyle : optionOffStyle}`}
                title="Encabezado 1"
            >
                <p className='font-semibold'>H1</p>
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('heading', { level: 2 }) ? optionOnStyle : optionOffStyle}`}
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
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('link') ? optionOnStyle : optionOffStyle}`}
                title="Insertar enlace"
            >
                <FaLink className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('code') ? optionOnStyle : optionOffStyle}`}
                title="Código"
            >
                <FaCode className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`px-2 py-1 rounded cursor-pointer ${editor.isActive('blockquote') ? optionOnStyle : optionOffStyle}`}
                title="Cita"
            >
                <FaQuoteLeft className="w-4 h-4" />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                className={`px-2 py-1 rounded cursor-pointer ${optionOffStyle}`}
                title="Borrar formato"
            >
                <FaEraser className="w-4 h-4" />
            </button>
        </div>
    )
}
