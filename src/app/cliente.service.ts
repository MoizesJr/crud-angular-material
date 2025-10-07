import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  static REPO_CLIENTES = "_CLIENTES";


  constructor() {  }

  salvar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  atualizar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.forEach(c => {
      if(c.id === cliente.id) {
        Object.assign(c, cliente);
      }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarClientes(nomeBusca: string) : Cliente[] {
    const Clientes = this.obterStorage();

    if (!nomeBusca || nomeBusca.trim().length === 0) {
      return Clientes;
    }

    return Clientes.filter(cliente => cliente.nome?.toLowerCase().indexOf(nomeBusca) !== -1);    
  }

  buscarClientePorId(id: string) : Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find( c => c.id === id);
  }

  private obterStorage() : Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }
}
