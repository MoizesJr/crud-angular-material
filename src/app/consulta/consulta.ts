import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';

@Component({
  selector: 'app-consulta',
  imports: [MatToolbar, RouterOutlet, MatInputModule,
    MatCardModule, FlexLayoutModule, MatIconModule,
    FormsModule, MatTableModule, MatButton, MatButtonModule, CommonModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email', 'acoes'];

  constructor(
    private service: ClienteService,
    private router: Router
  ) { 

   }

   ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes('');
   }

   pesquisar() {
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca)
   }

   preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { id } });
   }
  }