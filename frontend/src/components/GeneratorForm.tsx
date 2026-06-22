import { useState } from "react"


function GeneratorForm() {
    //Controlled components: React controla el valor de cada campo
    //en lugar de dejarlo a DOM. Necesario para leer los valores 
    //al momento de enviar el formulario.

    const [negocio , setNegocio] = useState('')
    const [publicacion , setPublicacion] = useState('')
    const [redSocial , setRedSocial] = useState('Facebook')
    const [tono, setTono] = useState('Formal')
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)
    const [resultado, setResultado] = useState('')

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
        <div>
            <section>
                <label>Que es tu negocio?</label>
                <input 
                    value={negocio}
                    onChange={(e) => setNegocio(e.target.value)}
                    type="text"
                />
            </section>
            <section>
                <label>Que quieres publicar?</label>
                <textarea
                    value={publicacion}
                    onChange={(e) => setPublicacion(e.target.value)
                    }
                    >
                </textarea>
            </section>
            <section>
                <label>Red social:</label>
                <select
                    value={redSocial}
                    onChange={(e) => setRedSocial(e.target.value)}
                    >
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="X">X(Twitter)</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="WatsApp">WatsApp</option>
                </select>
                <label>Tono:</label>
                <select
                    value={tono}
                    onChange={(e) => setTono(e.target.value)}
                    >
                    <option value="Formal">Formal</option>
                    <option value="Semi-formal">Semi-formal</option>
                    <option value="Casual">Casual</option>
                    <option value="Divertido">Divertido</option>
                    <option value="Elegante">Elegante</option>
                    <option value="De camaradas">De camaradas</option>
                </select>
            </section>
            <section>
                {error && <p>{error}</p>}
                {cargando && <p>Generando contenido...</p>}
                {resultado && <p>{resultado}</p>}
                <button onClick={handleGenerar}>Generar contenido</button>
            </section>
        </div>
    )
}

export default GeneratorForm