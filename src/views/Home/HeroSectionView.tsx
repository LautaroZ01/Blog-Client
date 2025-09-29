import AuthPhoto from "@/components/auth/AuthPhoto";
import { WriterProfile } from "@/types/userType";

type HeroSectionViewProps = {
    writerInfo: WriterProfile
}

export default function HeroSectionView({ writerInfo }: HeroSectionViewProps) {
    return (
        <main className="h-[calc(100vh-8rem)] relative" id="hero">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-radial-[at_70%_50%] from-primary-100/60 to-white to-50%"></div>
            <section className="container-blog flex flex-col items-center justify-center gap-4 h-full">
                <AuthPhoto photo={writerInfo.photo} name={writerInfo.name} size="big" />
                <div className="text-center">
                    <small className="font-bold text-gray-500">Hola 👋, Soy <span className="text-accent-400 font-extrabold">{writerInfo.name} {writerInfo.lastname}</span></small>
                    <h2 className="h1-style">Bienvenido a mi <span className="text-primary-500">Blog</span></h2>
                </div>
                <p className="text-gray-500 max-w-[80ch] text-center text-balance">Este es un espacio donde comparto mis pensamientos, ideas y experiencias con una mirada auténtica y personal. Aquí encontrarás desde reflexiones creativas hasta información práctica que puede inspirarte o ayudarte en tu día a día. Te invito a recorrer los artículos, dejar tus comentarios y formar parte de esta conversación. Porque las mejores ideas nacen cuando se comparten.</p>

                <div className="flex gap-4 p-4">
                    <a href="#contact" className="btn-secundary">Contactar</a>
                    <a href="#posts" className="btn-primary">Ver articulos</a>
                </div>
            </section>
        </main>
    )
}
