import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roadmap-inteligente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roadmap-inteligente.html',
  styleUrls: ['./roadmap-inteligente.css']
})
export class RoadmapInteligenteComponent implements OnChanges {

  @Input() resultado: any;

  fases: any[] = [];

  ngOnChanges() {
    if (!this.resultado) return;

    const nicho = this.resultado.nicho;
    const desafio = this.resultado.principal_desafio;

    const roadmaps: any = {
      clinica: {
        'Agendamentos manuais': [
          'Automatizar agendamentos',
          'Enviar confirmações automáticas',
          'Criar painel de consultas'
        ],
        'WhatsApp desorganizado': [
          'Organizar triagem de pacientes',
          'Automatizar respostas frequentes',
          'Implantar CRM de atendimento'
        ],
        'Controle financeiro manual': [
          'Digitalizar cobranças',
          'Automatizar recibos e lembretes',
          'Criar dashboard financeiro'
        ]
      },

      imobiliaria: {
        'Leads desorganizados': [
          'Centralizar leads em CRM',
          'Criar funil comercial',
          'Automatizar follow-up'
        ],
        'Atendimento lento': [
          'Automatizar resposta inicial',
          'Distribuir leads para corretores',
          'Acompanhar taxa de conversão'
        ],
        'Falta de CRM': [
          'Implantar gestão de clientes',
          'Organizar imóveis e oportunidades',
          'Criar indicadores comerciais'
        ]
      },

      escritorio: {
        'Planilhas manuais': [
          'Mapear planilhas críticas',
          'Automatizar entrada de dados',
          'Criar dashboards executivos'
        ],
        'Relatórios demorados': [
          'Centralizar dados',
          'Automatizar relatórios',
          'Criar painel gerencial'
        ],
        'Processos repetitivos': [
          'Mapear tarefas recorrentes',
          'Automatizar rotinas administrativas',
          'Acompanhar produtividade'
        ]
      },

      ecommerce: {
        'Pedidos manuais': [
          'Automatizar pedidos',
          'Integrar logística',
          'Criar painel de entregas'
        ],
        'Atendimento lento': [
          'Automatizar dúvidas frequentes',
          'Criar fluxo de pós-venda',
          'Medir tempo de resposta'
        ],
        'Controle de estoque': [
          'Automatizar alertas de estoque',
          'Integrar produtos e pedidos',
          'Criar relatório de giro'
        ]
      },

      restaurante: {
        'Pedidos desorganizados': [
          'Centralizar pedidos',
          'Automatizar confirmação',
          'Criar painel de operação'
        ],
        'WhatsApp manual': [
          'Implantar cardápio digital',
          'Automatizar pedidos via WhatsApp',
          'Criar controle de entregas'
        ],
        'Controle financeiro': [
          'Automatizar fechamento diário',
          'Controlar vendas e custos',
          'Criar dashboard financeiro'
        ]
      }
    };

    const etapas =
      roadmaps[nicho]?.[desafio] || [
        'Mapear processo atual',
        'Automatizar tarefas críticas',
        'Criar indicadores de acompanhamento'
      ];

    this.fases = etapas.map((etapa: string, index: number) => ({
      titulo: `Fase ${index + 1}`,
      descricao: etapa
    }));
  }
}