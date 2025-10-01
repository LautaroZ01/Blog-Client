import CloseModal from "./CloseModal"

type ModalProps = {
    children: React.ReactNode,
    title: string,
    isUserModal?: boolean
}

export default function Modal({ children, title, isUserModal }: ModalProps) {
    return (
        <div className="fixed top-0 left-0 w-full min-h-full bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm px-2">
            <div className={`bg-white p-4 rounded-lg lg:min-w-96 menu-animation ${isUserModal ? 'max-h-screen overflow-y-auto' : ''}`}>
                <CloseModal title={title} />
                {children}
            </div>
        </div>
    )
}
