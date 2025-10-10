import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { FaBook, FaCommentDots, FaHeart, FaComments, FaPlus } from "react-icons/fa";
import { StatsData } from "@/types/type";
import { useAuth } from "@/hooks/useAuth";
import ItemDashboard from "../ui/ItemDashboard";
import { Link } from "react-router-dom";
import ComentsStats from "./index/ComentsStats";
import ViewsStats from "./index/ViewsStats";
import AuthPhoto from "../auth/AuthPhoto";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

type WriterDashboardProps = {
    stats: StatsData
}

const WriterDashboard = ({ stats }: WriterDashboardProps) => {
    const { data, isLoading } = useAuth()

    const conversations = stats.lastConversations.map((conv) => {
        const lastMsg = conv.messages[0]?.text || "Sin mensajes aún";
        const otherParticipant = conv.participants[1];
        return {
            id: conv._id,
            name: `${otherParticipant?.name || "Usuario"} ${otherParticipant?.lastname || ""}`,
            photo: otherParticipant?.photo || "",
            lastMsg,
        };
    });

    if (isLoading) return 'Cargando...'

    if (data) return (
        <>
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Hola, <span className="text-primary-400">{data.name}</span></h1>
                    <p className="text-gray-500 mt-2">Aqui estan tus estadisticas, puedes ver tus articulos, comentarios, conversaciones y reacciones.</p>
                </div>
                <div>
                    <Link
                        to='/dashboard/post/create'
                        className="btn-primary flex items-center gap-2"
                    >
                        <FaPlus />
                        Escribir articulo
                    </Link>
                </div>
            </header>
            <div className="grid grid-cols-5 grid-rows-2 gap-4">
                <div className="col-span-2">
                    <h2 className="text-lg font-semibold text-gray-600">Resumen general</h2>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                        <ItemDashboard bgColor2="bg-green-500" bgColor="bg-green-50" textColor="text-green-500" title="Articulos" quantity={stats.totalPosts} icon={<FaBook className="size-6" />} />
                        <ItemDashboard bgColor2="bg-blue-500" bgColor="bg-blue-50" textColor="text-blue-500" title="Comentarios" quantity={stats.totalComments} icon={<FaCommentDots className="size-6" />} />
                        <ItemDashboard bgColor2="bg-purple-500" bgColor="bg-purple-50" textColor="text-purple-500" title="Conversaciones" quantity={stats.totalConversations} icon={<FaComments className="size-6" />} />
                        <ItemDashboard bgColor2="bg-red-500" bgColor="bg-red-50" textColor="text-red-500" title="Reacciones" quantity={stats.totalReactions} icon={<FaHeart className="size-6" />} />
                    </div>
                </div>
                <div className="col-span-3 col-start-3">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">
                        Comentarios por mes
                    </h2>
                    <ComentsStats stats={stats.commentsPerMonth} />
                </div>
                <div className="col-span-3 row-start-2">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">
                        Vistas por articulo
                    </h2>
                    <ViewsStats viewsLastPosts={stats.viewsLastPosts} />
                </div>
                <div className="col-span-2 col-start-4 row-start-2 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-600">
                        Conversaciones recientes
                    </h2>
                    <div className="grow flex flex-col justify-between">
                        {conversations.map((conv) => (
                            <Link to={`/chat/conversation/${conv.id}`} key={conv.id} className="flex items-center gap-2 hover:bg-gray-100 p-2 my-2 rounded-md transition-colors duration-pro">
                                <div>
                                    <AuthPhoto photo={conv.photo} name={conv.name} size="small" />
                                </div>
                                <div>
                                    <strong className="text-gray-600">{conv.name}</strong>
                                    <small className="text-gray-500 block">{conv.lastMsg}</small>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WriterDashboard;