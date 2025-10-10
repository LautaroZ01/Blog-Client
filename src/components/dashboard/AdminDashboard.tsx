import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
    TimeScale,
} from "chart.js";
import { FaUsers, FaBook, FaEye, FaComments } from "react-icons/fa";
import ItemDashboard from "../ui/ItemDashboard";
import { StatsDataAdmin } from "@/types/type";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
    TimeScale
);

type AdminDashboardProps = {
    stats: StatsDataAdmin;
};

export default function AdminDashboard({ stats }: AdminDashboardProps) {
    const { data, isLoading } = useAuth()

    const {
        totalUsers,
        totalPosts,
        totalViews,
        totalConversations,
        postsByCategory,
        commentsLikesPerPost,
        messagesTimeline,
    } = stats;

    const barDoubleData = {
        labels: commentsLikesPerPost.labels,
        datasets: [
            {
                label: "Comentarios",
                data: commentsLikesPerPost.comments,
                backgroundColor: "rgba(99, 102, 241, 0.7)",
                borderRadius: 6,
            },
            {
                label: "Likes",
                data: commentsLikesPerPost.likes,
                backgroundColor: "rgba(34, 197, 94, 0.7)",
                borderRadius: 6,
            },
        ],
    };

    const baseChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
                labels: { color: "#4B5563" },
            },
        },
        scales: {
            x: {
                ticks: { display: false },
                grid: { display: false },
            },
            y: {
                ticks: { display: false },
                grid: { display: false },
                beginAtZero: true,
            },
        },
    };

    const timeLineData = {
        labels: messagesTimeline.labels,
        datasets: [
            {
                label: "Conversaciones",
                data: messagesTimeline.data,
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.3)",
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const barData = {
        labels: postsByCategory.labels,
        datasets: [
            {
                label: "Posts por categoría",
                data: postsByCategory.data,
                backgroundColor: "rgba(147, 51, 234, 0.5)",
                borderRadius: 6,
            },
        ],
    };

    if (isLoading) return 'Cargando...'

    if (data) return (
        <>
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Hola, <span className="text-primary-400">{data.name}</span></h1>
                    <p className="text-gray-500 mt-2">Aqui estan tus estadisticas, puedes ver los articulos, comentarios, conversaciones y reacciones.</p>
                </div>
                <div>
                    <Link
                        to='/dashboard/user'
                        className="btn-primary flex items-center gap-2"
                    >
                        <FaUsers />
                        Ver usuarios
                    </Link>
                </div>
            </header>
            <div className="grid grid-cols-5 grid-rows-2 gap-4">
                <div className="col-span-2 bg-white rounded-lg shadow flex flex-col justify-center">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        Resumen general
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <ItemDashboard
                            title="Usuarios"
                            quantity={totalUsers}
                            icon={<FaUsers />}
                            bgColor="bg-blue-100"
                            bgColor2="bg-blue-500"
                            textColor="text-blue-500"
                        />
                        <ItemDashboard
                            title="Posts"
                            quantity={totalPosts}
                            icon={<FaBook />}
                            bgColor="bg-purple-100"
                            bgColor2="bg-purple-500"
                            textColor="text-purple-500"
                        />
                        <ItemDashboard
                            title="Vistas"
                            quantity={totalViews}
                            icon={<FaEye />}
                            bgColor="bg-green-100"
                            bgColor2="bg-green-500"
                            textColor="text-green-500"
                        />
                        <ItemDashboard
                            title="Conversaciones"
                            quantity={totalConversations}
                            icon={<FaComments />}
                            bgColor="bg-pink-100"
                            bgColor2="bg-pink-500"
                            textColor="text-pink-500"
                        />
                    </div>
                </div>

                <div className="col-span-3 col-start-3 bg-white rounded-lg shadow p-4 flex flex-col">
                    <h3 className="font-semibold text-gray-700 mb-2">
                        Comentarios y Likes por Post
                    </h3>
                    <div className="flex-1">
                        <Bar data={barDoubleData} options={baseChartOptions} />
                    </div>
                </div>

                <div className="col-span-3 row-start-2 bg-white rounded-lg shadow p-4 flex flex-col">
                    <h3 className="font-semibold text-gray-700 mb-2">
                        Conversaciones a lo largo del tiempo
                    </h3>
                    <div className="flex-1">
                        <Line data={timeLineData} options={baseChartOptions} />
                    </div>
                </div>

                <div className="col-span-2 col-start-4 row-start-2 bg-white rounded-lg shadow p-4 flex flex-col">
                    <h3 className="font-semibold text-gray-700 mb-2">
                        Posts por Categoría
                    </h3>
                    <div className="flex-1">
                        <Bar data={barData} options={baseChartOptions} />
                    </div>
                </div>
            </div>
        </>
    );
}
