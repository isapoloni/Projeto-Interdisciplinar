import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { urlBackend } from '../assets/funcoes'
import Cookie from 'universal-cookie'
export const PessoaContext = createContext()
export function PessoaProvider ({children}){
  const [pessoas, setPessoas] = useState([])
  const cookies = new Cookie()
  const jwtAuth= cookies.get('authorization')	
  function getPessoas() {
    fetch(urlBackend + "/pessoas", { method: "GET" , headers: { "Content-Type": "application/json", "authorization": `${jwtAuth}` } }).then(resp => resp.json()).then(pessoas => setPessoas(pessoas))
  }
  useEffect(() => {
    getPessoas()
  }, [])
  return (
    <PessoaContext.Provider
      value={{
        pessoas
      }}
    >
      {children}
    </PessoaContext.Provider>
  )
}