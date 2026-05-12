import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-executivo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-executivo.html',
  styleUrls: ['./dashboard-executivo.css']
})
export class DashboardExecutivoComponent implements OnChanges {

  @Input() resultado: any;

  custoMensal = 0;
  economiaMensal = 0;
  economiaAnual = 0;
  economiaCincoAnos = 0;
  custoComAutomacao = 0;

  score = 0;
  maturidade = '';
  risco = '';
  potencial = '';

  ngOnChanges() {
    if (!this.resultado) return;

    this.custoMensal = this.resultado.custo_mensal_estimado || 0;
    this.economiaMensal = this.resultado.economia_potencial_mensal || 0;

    this.economiaAnual = this.economiaMensal * 12;
    this.economiaCincoAnos = this.economiaMensal * 60;
    this.custoComAutomacao = this.custoMensal - this.economiaMensal;

    const percentualPerda = this.custoMensal > 0
      ? (this.economiaMensal / this.custoMensal) * 100
      : 0;

    this.score = Math.round(100 - percentualPerda);

    if (this.score >= 75) {
      this.maturidade = 'Alta';
      this.risco = 'Baixo';
    } else if (this.score >= 45) {
      this.maturidade = 'Média';
      this.risco = 'Moderado';
    } else {
      this.maturidade = 'Baixa';
      this.risco = 'Alto';
    }

    if (this.economiaMensal >= 8000) {
      this.potencial = 'Muito alto';
    } else if (this.economiaMensal >= 3000) {
      this.potencial = 'Alto';
    } else {
      this.potencial = 'Moderado';
    }
  }

  get percentualAutomatizado() {
    if (!this.custoMensal) return 0;
    return (this.custoComAutomacao / this.custoMensal) * 100;
  }

  get percentualEconomia() {
    if (!this.custoMensal) return 0;
    return (this.economiaMensal / this.custoMensal) * 100;
  }

  get scoreStyle() {
    return `conic-gradient(#d64282 ${this.score * 3.6}deg, #f1dfeb 0deg)`;
  }
}