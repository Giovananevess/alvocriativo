import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulador-cenarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulador-cenarios.html',
  styleUrls: ['./simulador-cenarios.css']
})
export class SimuladorCenariosComponent implements OnChanges {

  @Input() resultado: any;

  custoAtual = 0;

  automacao = 30;
  reduzirHoras = 2;
  novosColaboradores = 2;

  economiaProjetada = 0;

  ngOnChanges() {
    if (!this.resultado) return;

    this.custoAtual = this.resultado.custo_mensal_estimado;

    this.calcular();
  }

  calcular() {

    const economiaAutomacao =
      this.custoAtual * (this.automacao / 100);

    const economiaHoras =
      this.reduzirHoras * 22 * 35;

    const impactoColaboradores =
      this.novosColaboradores * 2200;

    this.economiaProjetada =
      economiaAutomacao + economiaHoras - impactoColaboradores;
  }
}