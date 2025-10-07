import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { StatsData } from "@/types/type";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface ViewsStatsProps {
    viewsLastPosts: StatsData['viewsLastPosts'];
}

export default function ViewsStats({ viewsLastPosts }: ViewsStatsProps) {
    const data = {
        labels: viewsLastPosts.map((p) => p.title),
        datasets: [
            {
                label: "Vistas",
                data: viewsLastPosts.map((p) => p.views),
                backgroundColor: "rgba(37, 99, 235, 0.6)",
                borderColor: "rgba(37, 99, 235, 1)",
                borderWidth: 1,
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "rgba(37,99,235,0.9)",
                titleColor: "#fff",
                bodyColor: "#fff",
                padding: 8,
                callbacks: {
                    label: (ctx: any) => `${ctx.parsed.y} vistas`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { display: false }, // 👈 Oculta los nombres de los artículos
            },
            y: {
                grid: { display: false }, // si también querés ocultar la grilla
                ticks: { display: false }, // 👈 Oculta los números laterales
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="h-64 mt-6">
            <Bar data={data} options={options} />
        </div>
    );
}
