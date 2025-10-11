import { openRouter } from '@/lib/ai'
import { streamText } from 'ai'

type generateSummaryParams = {
    title: string,
    content: string
}

export const generateSummary = async ({ title, content }: generateSummaryParams) => {
    const result = streamText({
        model: openRouter('openai/gpt-oss-20b:free'),
        system: 'Eres un asistente que resumen textos' + 'Tu objetivo es resumir textos de manera concisa y precisa y darle al usuario una lista de los puntos principales del texto' + 'Si el texto es muy largo, resumelo en un solo parrafo',
        prompt: [
            {
                role: 'user',
                content: `Resumen el siguiente texto: ${title} ${content}`
            }
        ]
    })

    return result.textStream
}