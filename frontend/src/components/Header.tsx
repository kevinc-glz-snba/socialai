function Header() {
    return (
        <header className="bg-indigo-600 dark:bg-indigo-800 shadow-md">
            <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
                <div className="bg-white rounded-xl p-2">
                    <span className="text-2xl">🤖</span>
                </div>
                <div>
                    <h1 className="text-white text-2xl font-bold tracking-tight">
                        SOCIAL <span className="text-indigo-200">AI</span>
                    </h1>
                    <p className="text-indigo-200 text-sm">
                        Genera contenido para tus redes en segundos
                    </p>
                </div>
            </div>
        </header>
    )
}

export default Header