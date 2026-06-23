interface GeneratorFormProps {
    setNegocio: (valor: string) => void
    setPublicacion: (valor: string) => void
    setRedSocial: (valor: string) => void
    setTono: (valor: string) => void
    handleGenerar: () => void
    negocio: string,
    publicacion: string,
    redSocial: string,
    tono: string,
    error: string,
    cargando: boolean
}

function GeneratorForm({setNegocio, setPublicacion, setRedSocial, setTono, handleGenerar, negocio, publicacion, redSocial, tono, error,cargando}: GeneratorFormProps) {

    return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        
        <section className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                ¿Qué es tu negocio?
            </label>
            <input
                value={negocio}
                onChange={(e) => setNegocio(e.target.value)}
                type="text"
                placeholder="Ej: Pastelería artesanal, tienda de ropa, consultoría..."
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            />
        </section>

        <section className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                ¿Qué quieres publicar?
            </label>
            <textarea
                value={publicacion}
                onChange={(e) => setPublicacion(e.target.value)}
                rows={4}
                placeholder="Cuéntanos sobre qué quieres que hable tu publicación, qué ofreces, beneficios, promociones, consejos, etc."
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 resize-none"
            />
        </section>

        <section className="flex gap-4 mb-6">
            <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Red social
                </label>
                <select
                    value={redSocial}
                    onChange={(e) => setRedSocial(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="Facebook">📘 Facebook</option>
                    <option value="Instagram">📸 Instagram</option>
                    <option value="X">🐦 X (Twitter)</option>
                    <option value="TikTok">🎵 TikTok</option>
                    <option value="LinkedIn">💼 LinkedIn</option>
                    <option value="WhatsApp">💬 WhatsApp</option>
                </select>
            </div>

            <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Tono
                </label>
                <select
                    value={tono}
                    onChange={(e) => setTono(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="Formal">👔 Formal</option>
                    <option value="Semi-formal">🤝 Semi-formal</option>
                    <option value="Casual">😊 Casual</option>
                    <option value="Divertido">😄 Divertido</option>
                    <option value="Elegante">✨ Elegante</option>
                    <option value="De camaradas">🍻 De camaradas</option>
                </select>
            </div>
        </section>

        {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-2">
                ⚠️ {error}
            </p>
        )}

        <button
            onClick={() => handleGenerar()}
            disabled={cargando}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
        >
            {cargando ? "⏳ Generando contenido..." : "🚀 Generar contenido"}
        </button>

    </div>
)
}

export default GeneratorForm