import { StatsData } from "@/types/type"
import { Line } from "react-chartjs-2";

type ComentsStatsProps = {
    stats: StatsData['commentsPerMonth']
}

export default function ComentsStats({ stats }: ComentsStatsProps) {
    // --- ordenar TODOS los meses en español (códigos y etiquetas)
    const monthOrderCodes = [
        "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"
    ];
    const monthLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];

    // --- alias para normalizar claves que puedan venir como 'sep', 'septiembre', 'agosto', etc.
    const monthAliases: Record<string, string> = {
        // abreviaturas y nombres completos comunes en español
        "ene": "ene", "enero": "ene",
        "feb": "feb", "febrero": "feb",
        "mar": "mar", "marzo": "mar",
        "abr": "abr", "abril": "abr",
        "may": "may", "mayo": "may",
        "jun": "jun", "junio": "jun",
        "jul": "jul", "julio": "jul",
        "ago": "ago", "agosto": "ago",
        "sep": "sept", "sept": "sept", "septiembre": "sept",
        "oct": "oct", "octubre": "oct",
        "nov": "nov", "noviembre": "nov",
        "dic": "dic", "diciembre": "dic",
    };

    // --- construir datasets garantizando que haya 12 puntos (uno por mes) por cada post
    const commentsDatasets = stats.map((post, i) => {
        // normalizar claves del objeto post.data
        const normalized: Record<string, number> = {};
        Object.entries(post.data || {}).forEach(([rawK, v]) => {
            const k = String(rawK).toLowerCase().trim();
            const code = monthAliases[k] ?? k; // si no está en aliases, dejamos la clave tal cual
            normalized[code] = Number(v) || 0;
        });

        // construir array de 12 valores (0 si no existe)
        const valuesByMonth = monthOrderCodes.map((code) => normalized[code] ?? 0);

        // color distintivo por dataset
        const hue = (i * 55) % 360; // variación de color por dataset
        return {
            label: post.postTitle,
            data: valuesByMonth,
            borderColor: `hsl(${hue} 80% 45%)`,
            backgroundColor: (ctx: any) => {
                // crear gradiente dinámico (necesita chartArea definido)
                const chart = ctx.chart;
                const { ctx: canvasCtx, chartArea } = chart;
                if (!chartArea) return `hsla(${hue}, 80%, 45%, 0.12)`;
                const grad = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                grad.addColorStop(0, `hsla(${hue}, 80%, 45%, 0)`);
                grad.addColorStop(1, `hsla(${hue}, 80%, 45%, 0.12)`);
                return grad;
            },
            tension: 0.34,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: `hsl(${hue} 80% 45%)`,
            pointBorderWidth: 2,
        };
    });

    // --- data final para Chart.js: 12 meses (Ene..Dic) y un dataset por post
    const commentsLineData = {
        labels: monthLabels,
        datasets: commentsDatasets,
    };
    return (
        <div className="h-64 px-8"> {/* 16rem ~ 256px */}
            <Line
                data={commentsLineData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        // ❌ Ocultar nombres de los artículos (leyenda)
                        legend: { display: false },

                        tooltip: {
                            backgroundColor: "rgba(37, 99, 235, 0.9)",
                            titleColor: "#fff",
                            bodyColor: "#fff",
                            padding: 10,
                            displayColors: false,
                            callbacks: {
                                label: (ctx) => `${ctx.parsed.y} comentarios`,
                            },
                        },
                    },
                    scales: {
                        // ❌ Eje X sin nombres de artículos, solo meses
                        x: {
                            grid: { display: false },
                            ticks: {
                                color: "#9ca3af",
                                // Si querés ocultar también los nombres de los meses:
                                // display: false,
                            },
                        },
                        // ❌ Quitar números laterales del eje Y
                        y: {
                            grid: { color: "rgba(229,231,235,0.1)" },
                            beginAtZero: true,
                            ticks: {
                                display: false, // 👈 Esto quita los números laterales
                            },
                            border: {
                                display: false, // oculta la línea del eje Y
                            },
                        },
                    },
                    elements: {
                        line: { borderWidth: 2 },
                        point: { hoverRadius: 6 },
                    },
                }}
            />
        </div>

    )
}
