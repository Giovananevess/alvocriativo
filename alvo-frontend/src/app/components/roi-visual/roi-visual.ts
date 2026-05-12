import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roi-visual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roi-visual.html',
  styleUrls: ['./roi-visual.css']
})
export class RoiVisualComponent implements OnChanges {

  @Input() resultado: any;

  custoMensal = 0;
  custoAnual = 0;
  custoCincoAnos = 0;

  custoComAutomacao = 0;
  economiaMensal = 0;
  economiaAnual = 0;
  economiaCincoAnos = 0;

  contadorEconomia = 0;

  ngOnChanges() {
    if (!this.resultado) return;

    this.custoMensal = this.resultado.custo_mensal_estimado;
    this.economiaMensal = this.resultado.economia_potencial_mensal;

    this.custoAnual = this.custoMensal * 12;
    this.custoCincoAnos = this.custoMensal * 60;

    this.custoComAutomacao = this.custoMensal - this.economiaMensal;

    this.economiaAnual = this.economiaMensal * 12;
    this.economiaCincoAnos = this.economiaMensal * 60;

    this.animarContador();
  }

  animarContador() {
    this.contadorEconomia = 0;

    const total = this.economiaMensal;
    const duracao = 1200;
    const passos = 40;
    const incremento = total / passos;
    let atual = 0;

    const intervalo = setInterval(() => {
      atual++;

      this.contadorEconomia += incremento;

      if (atual >= passos) {
        this.contadorEconomia = total;
        clearInterval(intervalo);
      }
    }, duracao / passos);
  }

  get percentualAutomatizado() {
    if (!this.custoMensal) return 0;
    return (this.custoComAutomacao / this.custoMensal) * 100;
  }

  get percentualEconomia() {
    if (!this.custoMensal) return 0;
    return (this.economiaMensal / this.custoMensal) * 100;
  }
}