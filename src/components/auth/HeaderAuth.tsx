import ArrowBack from "../ui/ArrowBack";

type HeaderAuthProps = {
    title: string
    text: string
    strongText: string
    isActive?: boolean
}

export default function HeaderAuth({ title, text, strongText, isActive = true }: HeaderAuthProps) {
    return (
        <header className="flex flex-col items-center justify-center py-4 min-w-full md:min-w-xl max-w-full mx-auto text-center">
            <div className="size-40 rounded-full flex items-center justify-center">
                <img src="/Logo-blog.png" alt="Logo blog" className="w-full object-contain" />
            </div>
            <div className="flex items-center w-full">
                {isActive && <ArrowBack />}
                <h1 className="h1-style grow">{title}</h1>
            </div>
            <p className="text-balance text-gray-500 font-light mt-5">
                {text} {''}
                <span className="font-bold">{strongText}</span>
            </p>
        </header>
    )
}
