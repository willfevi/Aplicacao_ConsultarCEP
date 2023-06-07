import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import api from './services/api'
function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input == '') {
      alert('Preencha com um Cep válido!')
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch {
      alert('Erro ao fazer a consulta, verifique o cep e tente novamente!')
      setInput('')
    }
  }

  return (
    <div className="Container">
      <h1 className="Title">Busque o CEP:</h1>

      <div className="Container_input">
        <input
          type="text"
          placeholder="Digite seu CEP:"
          value={input}
          onChange={e => {
            return setInput(e.target.value)
          }}
        ></input>

        <button className="Search_button" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP:{cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span> complemento:{cep.complemento}</span>
          <span>{cep.bairro} </span>
          <span>
            {cep.localidade}-{cep.uf}
          </span>
        </main>
      )}
    </div>
  )
}

export default App
