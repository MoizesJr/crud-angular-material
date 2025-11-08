import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBar} from '@angular/material/snack-bar'
import { MatSelectChange, MatSelectModule } from '@angular/material/select'
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule, 
    MatCardModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    NgxMaskDirective, ],
    providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(private service: ClienteService, 
              private brasilApiService: BrasilapiService,
              private route: ActivatedRoute,
              private router: Router
  ) {  }

  ngOnInit(): void {
      this.route.queryParamMap.subscribe( (query: any) => {
        const params = query['params'];
        const id = params['id'];
        if (id) {
          let clienteEncontrado = this.service.buscarClientePorId(id);
          if (clienteEncontrado) {
            this.cliente = clienteEncontrado;
            this.atualizando = true;
            if (this.cliente.uf) {
              const event = { value: this.cliente.uf }
              this.carregarMunicipios(event as MatSelectChange);
            }
          }
        }
  })
  this.carregarUfs();
  }

    carregarUfs() {
      this.brasilApiService.listarUfs().subscribe({
        next: listaEstados => this.estados = listaEstados,
        error: erro => console.error("ocorreu um erro", erro)
      })
    }

    carregarMunicipios(event: MatSelectChange) {
     const ufSelecionada = event.value;
      this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({ 
        next: listaMunicipios => this.municipios = listaMunicipios,
        error: erro => console.error("ocorreu um erro", erro)
      })
    }

  salvar() {
    if (!this.atualizando) {
    this.service.salvar(this.cliente);
    this.cliente = Cliente.newCliente();
    this.mostrarMensagem('Cliente salvo com sucesso!');
    } else {
      this.service.atualizar(this.cliente);
      this.mostrarMensagem('Cliente atualizado com sucesso!');
      this.router.navigate(['/consulta']);
    }
  }

  mostrarMensagem(msg: string) {
    this.snack.open(msg, 'OK');
  }
}

