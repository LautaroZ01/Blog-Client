import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Toolbar from "./Toolbar"
import { Control, Controller } from "react-hook-form"
import ErrorMessage from "../ui/ErrorMessage"

interface FormData {
    [key: string]: string;
}

type RichTextProps = {
    name: string
    control: Control<FormData>
}

export default function RichText({ name, control }: RichTextProps) {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: "El contenido es requerido" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                    <TiptapEditor onChange={onChange} content={value} />
                    {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </>
            )}
        />
    )
}

function TiptapEditor({ onChange, content }: { onChange: (content: string) => void, content: string }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                HTMLAttributes: {
                    class: 'text-blue-500 hover:text-blue-600 underline',
                },
            }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "min-h-40 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent",
            },
        },
    })

    return (
        <>
            <div>
                <label htmlFor="content" className="text-sm font-semibold text-gray-800">Contenido</label>
            </div>
            <div className="flex flex-col p-3 form-data">
                <Toolbar editor={editor} />
                <EditorContent editor={editor} className="input-data rich-text-style m-4" />
            </div>
        </>
    )
}