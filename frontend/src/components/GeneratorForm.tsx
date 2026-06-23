import { useState } from "react"

interface GeneratorFormProps {
    setResultado: (valor: string) => void
}

function GeneratorForm({setResultado}: GeneratorFormProps) {
    //Controlled components: React controla el valor de cada campo
    //en lugar de dejarlo a DOM. Necesario para leer los valores 
    //al momento de enviar el formulario.

    const [negocio , setNegocio] = useState('')
    const [publicacion , setPublicacion] = useState('')
    const [redSocial , setRedSocial] = useState('Facebook')
    const [tono, setTono] = useState('Formal')
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)

    //Se usa async para evitar que esta tarea congele las
    //otras funciones del sistema 
    async function handleGenerar(){
        // 1. Validar
        if (negocio === "" || publicacion === "") {
            setError("Por favor completa todos los campos.")
            return  // detiene la ejecución aquí
        }
        setError("")
        setCargando(true)
        try{
            //await indica que primero debe completarse esta tarea para
            //que se puedan ejecutar el resto de lineas de codigo
            const respuesta = await fetch("http://127.0.0.1:8000/generar",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({negocio,publicacion,redSocial,tono})
            })
            if (!respuesta.ok){
                throw new Error("Algo salio mal en el servidor")
            }
            const datos = await respuesta.json()
            setResultado(datos.resultado)
            
        }catch (error){
            setError("Algo salio mal en el servidor")
            console.log("Hubo un error:", error)
        }finally{
            //Se coloca setCargando dentro de finally para que 
            //este cambie su valor sin importar el resultado de la
            //consulta
            setCargando(false)
        } 
        
    }

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
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="X">X (Twitter)</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="WhatsApp">WhatsApp</option>
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
                    <option value="Formal">Formal</option>
                    <option value="Semi-formal">Semi-formal</option>
                    <option value="Casual">Casual</option>
                    <option value="Divertido">Divertido</option>
                    <option value="Elegante">Elegante</option>
                    <option value="De camaradas">De camaradas</option>
                </select>
            </div>
        </section>

        {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-2">
                ⚠️ {error}
            </p>
        )}

        <button
            onClick={handleGenerar}
            disabled={cargando}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
        >
            {cargando ? "⏳ Generando contenido..." : "🚀 Generar contenido"}
        </button>

    </div>
)
}

export default GeneratorForm