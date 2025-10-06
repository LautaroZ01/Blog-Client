import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface jsPDFWithAutoTable extends jsPDF {
    lastAutoTable?: {
        finalY: number;
    };
}

export interface StatsData {
    totalPosts: number;
    totalViews: number;
    totalReadTime: number;
    avgReadTime: number;
    totalComments: number;
    totalLikes: number;
    postsByCategory: { category: string; count: number }[];
    postsByMonth: { month: string; count: number }[];
}

export const generatePostReportPDF = (data: StatsData) => {
    const doc = new jsPDF() as jsPDFWithAutoTable;

    doc.setFontSize(18);
    doc.text("Informe Estadístico de Artículos", 14, 20);

    doc.setFontSize(12);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 30);

    autoTable(doc, {
        startY: 60,
        head: [["Métrica", "Valor"]],
        body: [
            ["Total de artículos", data.totalPosts],
            ["Total de vistas", data.totalViews],
            ["Tiempo total de lectura (min)", data.totalReadTime],
            ["Promedio de lectura (min)", data.avgReadTime.toFixed(2)],
            ["Total de comentarios", data.totalComments],
            ["Total de me gusta", data.totalLikes],
        ],
    });

    autoTable(doc, {
        head: [["Categoría", "Cantidad"]],
        body: data.postsByCategory.map(c => [c.category, c.count]),
    });

    autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY || 60) + 10,
        head: [["Mes", "Cantidad"]],
        body: data.postsByMonth.map(m => [m.month, m.count]),
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text("Blog Dashboard © 2025", 14, pageHeight - 10);

    const pdfUrl = doc.output("bloburl");
    window.open(pdfUrl, "_blank");
};
