import Header from "./components/Header"
import GeneratorForm from "./components/GeneratorForm"
import ResultCard from "./components/ResultCard"

import { useState } from "react"

function App() {
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
          const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/generar`,{
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <GeneratorForm setNegocio = {setNegocio} setPublicacion={setPublicacion} setRedSocial={setRedSocial} setTono={setTono} handleGenerar={handleGenerar} negocio={negocio} publicacion={publicacion} redSocial={redSocial} tono={tono} error={error} cargando={cargando} />
        <ResultCard resultado={resultado} handleGenerar={handleGenerar} setResultado={setResultado} cargando ={cargando}/>
      </main>
      
    </div>
  )
}

export default App