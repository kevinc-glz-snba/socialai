import { useState } from "react"
import ReactMarkdown from "react-markdown"

interface ResultCardProps {
    resultado: string
}

function ResultCard({ resultado }: ResultCardProps) {

    const [copiado, setCopiado] = useState(false)

    async function handleCopiar() {
        await navigator.clipboard.writeText(resultado)
        setCopiado(true)
        setTimeout(() => setCopiado(false), 2000)
    }

    if (!resultado) return null

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            
            <h2 className="text-indigo-900 dark:text-indigo-400 font-bold text-lg mb-4">
                ✨ RESULTADO
            </h2>

            <div className="prose dark:prose-invert max-w-none mb-6">
                <ReactMarkdown >
                    {resultado}
                </ReactMarkdown>
            </div>

            <button
                onClick={handleCopiar}
                className="w-full border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200"
            >
                {copiado ? "✅ ¡Copiado!" : "📋 Copiar"}
            </button>

        </div>
    )
}

export default ResultCard