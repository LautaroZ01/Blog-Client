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
import { Line, Bar } from "react-chartjs-2";
import { FaBook, FaCommentDots, FaHeart, FaComments } from "react-icons/fa";
import { StatsData } from "@/types/type";
import { useAuth } from "@/hooks/useAuth";

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

    const allMonths = Array.from(
        new Set(stats.commentsPerMonth.flatMap((p) => Object.keys(p.data)))
    );
    const commentsLineData = {
        labels: allMonths,
        datasets: stats.commentsPerMonth.map((post, i) => ({
            label: post.postTitle,
            data: allMonths.map((m) => post.data[m] || 0),
            borderColor: `hsl(${i * 60}, 70%, 55%)`,
            backgroundColor: `hsla(${i * 60}, 70%, 55%, 0.2)`,
        })),
    };

    // ---------------------------
    // 2️⃣ Datos para la gráfica de barras
    // ---------------------------
    const viewsBarData = {
        labels: stats.viewsLastPosts.map((v) => v.title),
        datasets: [
            {
                label: "Vistas",
                data: stats.viewsLastPosts.map((v) => v.views),
                backgroundColor: "rgba(37, 99, 235, 0.6)",
            },
        ],
    };

    // ---------------------------
    // 3️⃣ Conversaciones recientes
    // ---------------------------
    const conversations = stats.lastConversations.map((conv) => {
        const lastMsg = conv.messages[0]?.text || "Sin mensajes aún";
        const otherParticipant = conv.participants[1];
        return {
            id: conv._id,
            name: `${otherParticipant?.name || "Usuario"} ${otherParticipant?.lastname || ""}`,
            photo: otherParticipant?.photo || "/default-avatar.png",
            lastMsg,
        };
    });

    // ---------------------------
    // 4️⃣ UI
    // ---------------------------
    if (isLoading) return 'Cargando...'

    if (data) return (
        <>
            <header>
                <h1 className="text-2xl font-semibold">Hola, <span className="text-primary-400">{data.name}</span></h1>
                <p className="text-gray-500 mt-2">Aqui estan tus estadisticas, puedes ver tus articulos, comentarios, conversaciones y reacciones.</p>
            </header>
            <div className="grid grid-cols-3 grid-rows-2 gap-4 py-10">
                <div >1</div>
                <div className="col-span-2">2</div>
                <div className="col-span-2 row-start-2">3</div>
                <div className="col-start-3 row-start-2">4</div>
            </div>
        </>
        // <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-6">
        //     {/* 🧮 Totales */}
        //     <div className="col-span-1 xl:col-span-1 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col justify-center items-center text-center">
        //         <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">
        //             Resumen general
        //         </h2>
        //         <div className="grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-200">
        //             <div className="flex flex-col items-center">
        //                 <FaBook className="text-3xl text-blue-500 mb-1" />
        //                 <p className="text-2xl font-bold">{stats.totalPosts}</p>
        //                 <span className="text-sm">Artículos</span>
        //             </div>
        //             <div className="flex flex-col items-center">
        //                 <FaCommentDots className="text-3xl text-green-500 mb-1" />
        //                 <p className="text-2xl font-bold">{stats.totalComments}</p>
        //                 <span className="text-sm">Comentarios</span>
        //             </div>
        //             <div className="flex flex-col items-center">
        //                 <FaComments className="text-3xl text-purple-500 mb-1" />
        //                 <p className="text-2xl font-bold">{stats.totalConversations}</p>
        //                 <span className="text-sm">Conversaciones</span>
        //             </div>
        //             <div className="flex flex-col items-center">
        //                 <FaHeart className="text-3xl text-red-500 mb-1" />
        //                 <p className="text-2xl font-bold">{stats.totalReactions}</p>
        //                 <span className="text-sm">Reacciones</span>
        //             </div>
        //         </div>
        //     </div>

        //     {/* 📈 Gráfica multilínea */}
        //     <div className="col-span-1 xl:col-span-1 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4">
        //         <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">
        //             Comentarios por mes
        //         </h2>
        //         <Line
        //             data={commentsLineData}
        //             options={{
        //                 responsive: true,
        //                 plugins: { legend: { position: "bottom" } },
        //             }}
        //         />
        //     </div>

        //     {/* 📉 Gráfica de barras */}
        //     <div className="col-span-1 xl:col-span-1 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4">
        //         <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">
        //             Vistas de artículos
        //         </h2>
        //         <Bar
        //             data={viewsBarData}
        //             options={{
        //                 responsive: true,
        //                 plugins: { legend: { display: false } },
        //                 scales: { y: { beginAtZero: true } },
        //             }}
        //         />
        //     </div>

        //     {/* 💬 Últimas conversaciones */}
        //     <div className="col-span-1 xl:col-span-1 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4">
        //         <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">
        //             Últimas conversaciones
        //         </h2>
        //         <div className="space-y-3">
        //             {conversations.map((c) => (
        //                 <div
        //                     key={c.id}
        //                     className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        //                 >
        //                     <img
        //                         src={c.photo}
        //                         alt={c.name}
        //                         className="w-10 h-10 rounded-full object-cover"
        //                     />
        //                     <div className="flex flex-col">
        //                         <span className="font-semibold text-gray-800 dark:text-gray-200">
        //                             {c.name}
        //                         </span>
        //                         <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
        //                             {c.lastMsg}
        //                         </span>
        //                     </div>
        //                 </div>
        //             ))}
        //             {conversations.length === 0 && (
        //                 <p className="text-gray-500 text-sm text-center">
        //                     No hay conversaciones recientes.
        //                 </p>
        //             )}
        //         </div>
        //     </div>
        // </div>
    );
};

export default WriterDashboard;