import { Link } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-gray-200 py-8">
      <div className="container-blog flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-0">
        <Link to='/post' className="flex items-center gap-2">
          <img src="/Logo-blog.png" alt="Logo del Blog" className="w-16" />
          <h3 className="text-2xl font-semibold text-primary-500">Blog</h3>
        </Link>
        <div className="grow">
          <nav className="flex flex-col md:flex-row items-center justify-center md:gap-2 gap-4 font-semibold text-primary-500 nav-footer">
            <a href="/">Inicio</a>
            <a href="#posts">Articulos</a>
            <Link to="/post">Lista de articulos</Link>
            <a href="#contact">Contacto</a>
          </nav>
        </div>
        <button onClick={scrollToTop} className="md:ml-24 btn-rounded">
          <IoIosArrowUp />
        </button>

      </div>
      <small className="text-center font-semibold text-gray-500 block mt-4 md:mt-0">© 2025 Blog. Todos los derechos reservados.</small>
    </footer>
  )
}
