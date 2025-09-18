import CloseModal from "../ui/CloseModal";

type ModalDashboardProps = {
    title: string
    children: React.ReactNode
}

export default function ModalDashboard({ title, children }: ModalDashboardProps) {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-end z-50 backdrop-blur-sm">
            <div className="bg-white p-4 min-w-lg h-full fade-in-animation">
                <CloseModal title={title} />

                <section>
                    {children}
                </section>
            </div>
        </div>
    )
}
