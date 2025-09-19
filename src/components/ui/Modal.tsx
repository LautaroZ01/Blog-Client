import CloseModal from "./CloseModal"

type ModalProps = {
    children: React.ReactNode,
    title: string
}

export default function Modal({ children, title }: ModalProps) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm px-2">
            <div className="bg-white p-4 rounded-lg lg:min-w-96 menu-animation">
                <CloseModal title={title} />
                {children}
            </div>
        </div>
    )
}
