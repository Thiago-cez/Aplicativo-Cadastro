import { useEffect, useState } from "react"
import ColecaoCliente from "../backend/db/ColecaoCliente"
import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useClientes(){
    const repo: ClienteRepositorio = new ColecaoCliente()

    const { tabelaVisivel, exibirFomulario, exibirTabela} = useTabelaOuForm()

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

  useEffect(obterTodos, [])

  function obterTodos(){
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      exibirTabela()
    })
  }

   function selecionarCliente(cliente: Cliente){
     setCliente(cliente)
     exibirFomulario()
   }

   async function excluirCliente(cliente: Cliente){
     await repo.excluir(cliente)
     obterTodos()
   }

    async function salvarCliente(cliente: Cliente) {
     await repo.salvar(cliente)
    obterTodos()
   }

   function novoCliente() {
    setCliente(Cliente.vazio())
    exibirFomulario()
   }
      return {
        
        cliente,
        clientes,
        salvarCliente,
        novoCliente,
        excluirCliente,
        selecionarCliente,
        obterTodos,
        tabelaVisivel,
        exibirTabela
      }
}