import Header from "./components/Header"
import GeneratorForm from "./components/GeneratorForm"
import ResultCard from "./components/ResultCard"

import { useState } from "react"

function App() {
  
  const [resultado, setResultado] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-2x1 mx-auto px-4 py-8">
        <GeneratorForm setResultado = {setResultado} />
        <ResultCard resultado={resultado}/>
      </main>
      
    </div>
  )
}

export default App