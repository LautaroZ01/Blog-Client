import { ReactNode } from "react"

type HeaderProps = {
    title: string
    subtitleA: string
    subtitleB: string
    children: ReactNode
}

export default function Header({title, subtitleA, subtitleB, children}: HeaderProps) {
    return (
        <header className="flex justify-between items-center mb-4">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
                <p className="text-gray-500">{subtitleA} <span className="font-bold">{subtitleB}</span></p>
            </div>
            <div>
                {children}
            </div>
        </header>
    )
}
