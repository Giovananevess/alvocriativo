import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './form-orcamento.html',
  styleUrls: ['./form-orcamento.css']
})
export class FormOrcamentoComponent {

  constructor(private http: HttpClient) {}

  dadosForm = {
    nome: '',
    responsavel: '',
    colaboradores: 0,
    horas_dia: 0,
    valor_hora: 0,
    desafio: ''
  };

  resultado: any = null;
  carregando = false;

  enviar() {
    this.carregando = true;
    this.resultado = null;

    this.http.post<any>('http://localhost:5000/api/lead', this.dadosForm)
      .subscribe({
        next: (res) => {
          console.log('Sucesso:', res);

          this.resultado = res.diagnostico;
          this.carregando = false;
        },
        error: (err) => {
          console.error('Erro:', err);

          this.carregando = false;
          alert('Erro ao gerar diagnóstico.');
        }
      });
  }
}