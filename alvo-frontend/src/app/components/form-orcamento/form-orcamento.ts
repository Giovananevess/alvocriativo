import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DashboardExecutivoComponent } from '../dashboard-executivo/dashboard-executivo';
import { RoadmapInteligenteComponent } from '../roadmap-inteligente/roadmap-inteligente';
import { SimuladorCenariosComponent } from '../simulador-cenarios/simulador-cenarios';
import { SidebarComponent } from '../sidebar/sidebar';

import jsPDF from 'jspdf';

@Component({
  selector: 'app-form-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DashboardExecutivoComponent,
    RoadmapInteligenteComponent,
    SimuladorCenariosComponent,
    SidebarComponent
  ],
  templateUrl: './form-orcamento.html',
  styleUrls: ['./form-orcamento.css']
})
export class FormOrcamentoComponent {

  constructor(private http: HttpClient) { }

  dadosForm = {
    nome: '',
    responsavel: '',
    nicho: '',
    colaboradores: 0,
    horas_dia: 0,
    valor_hora: 0,
    desafio: ''
  };

  resultado: any = null;
  carregando = false;

  get desafiosPorNicho() {
    const desafios: any = {
      clinica: [
        'Agendamentos manuais',
        'WhatsApp desorganizado',
        'Controle financeiro manual'
      ],
      imobiliaria: [
        'Leads desorganizados',
        'Atendimento lento',
        'Falta de CRM'
      ],
      escritorio: [
        'Planilhas manuais',
        'Relatórios demorados',
        'Processos repetitivos'
      ],
      ecommerce: [
        'Pedidos manuais',
        'Atendimento lento',
        'Controle de estoque'
      ],
      restaurante: [
        'Pedidos desorganizados',
        'WhatsApp manual',
        'Controle financeiro'
      ]
    };

    return desafios[this.dadosForm.nicho] || [];
  }

  get nomeNicho() {
    const nomes: any = {
      clinica: 'Clínica',
      imobiliaria: 'Imobiliária',
      escritorio: 'Escritório',
      ecommerce: 'E-commerce',
      restaurante: 'Restaurante'
    };

    return nomes[this.dadosForm.nicho] || 'Não informado';
  }

  limparDesafio() {
    this.dadosForm.desafio = '';
  }

  enviar() {
    this.carregando = true;
    this.resultado = null;

    this.http.post<any>('https://alvocriativo-api.onrender.com/api/lead', this.dadosForm)
      .subscribe({
        next: (res) => {
          console.log('Sucesso:', res);

          this.resultado = res.diagnostico;
          this.carregando = false;
        },
        error: (err) => {
          console.error('Erro:', err);

          this.carregando = false;
          alert('Erro ao enviar.');
        }
      });
  }

  gerarPDF() {
    if (!this.resultado) return;

    const pdf = new jsPDF('p', 'mm', 'a4');

    const azul = '#004cba';
    const bege = '#f8f5eb';
    const preto = '#171717';

    const empresa = this.resultado.empresa || this.dadosForm.nome;
    const responsavel = this.resultado.responsavel || this.dadosForm.responsavel;
    const segmento = this.nomeNicho;

    const custoMensal = this.resultado.custo_mensal_estimado || 0;
    const economiaMensal = this.resultado.economia_potencial_mensal || 0;
    const economiaAnual = this.resultado.economia_potencial_anual || 0;
    const economiaCincoAnos = economiaMensal * 60;

    pdf.setFillColor(bege);
    pdf.rect(0, 0, 210, 297, 'F');

    pdf.setTextColor(azul);
    pdf.setFont('times', 'normal');
    pdf.setFontSize(28);
    pdf.text('Diagnóstico Operacional', 20, 28);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text('Gerado pela Alvo Criativo', 20, 38);

    pdf.setDrawColor(azul);
    pdf.line(20, 45, 190, 45);

    pdf.setTextColor(preto);
    pdf.setFontSize(13);
    pdf.text(`Empresa: ${empresa}`, 20, 58);
    pdf.text(`Responsável: ${responsavel}`, 20, 66);
    pdf.text(`Segmento: ${segmento}`, 20, 74);
    pdf.text(`Status: ${this.resultado.status_qualificacao}`, 20, 82);

    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(20, 94, 170, 52, 6, 6, 'F');

    pdf.setTextColor(azul);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.text('Resumo Financeiro', 28, 108);

    pdf.setTextColor(preto);
    pdf.setFontSize(11);
    pdf.text(`Custo mensal estimado: R$ ${custoMensal.toLocaleString('pt-BR')}`, 28, 120);
    pdf.text(`Economia mensal: R$ ${economiaMensal.toLocaleString('pt-BR')}`, 28, 129);
    pdf.text(`Economia anual: R$ ${economiaAnual.toLocaleString('pt-BR')}`, 28, 138);

    pdf.setFillColor(0, 76, 186);
    pdf.roundedRect(20, 158, 170, 34, 6, 6, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text('Economia projetada em 5 anos', 28, 172);

    pdf.setFontSize(20);
    pdf.text(`R$ ${economiaCincoAnos.toLocaleString('pt-BR')}`, 28, 184);

    pdf.setTextColor(azul);
    pdf.setFontSize(15);
    pdf.text('Sugestão Técnica', 20, 211);

    pdf.setTextColor(preto);
    pdf.setFontSize(11);

    const sugestao = pdf.splitTextToSize(this.resultado.sugestao_tecnica, 165);
    pdf.text(sugestao, 20, 222);

    pdf.setTextColor(azul);
    pdf.setFontSize(15);
    pdf.text('Roadmap recomendado', 20, 248);

    pdf.setTextColor(preto);
    pdf.setFontSize(11);
    pdf.text('1. Mapear o processo manual atual', 20, 260);
    pdf.text('2. Identificar tarefas repetitivas com maior perda financeira', 20, 269);
    pdf.text('3. Automatizar o fluxo prioritário', 20, 278);
    pdf.text('4. Acompanhar resultados com indicadores mensais', 20, 287);

    pdf.save(`diagnostico-${empresa}.pdf`);
  }
}