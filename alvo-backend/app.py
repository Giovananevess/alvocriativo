from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

MAKE_URL = "https://hook.us2.make.com/6ybq1ad78te2ndeh4a9bp4hrdmpa0ykj"


@app.route('/api/lead', methods=['POST'])
def novo_lead():
    data = request.json or {}

    nome = data.get('nome', 'Empresa não informada')
    responsavel = data.get('responsavel', '')
    nicho = data.get('nicho', '')

    colaboradores = float(data.get('colaboradores', 0))
    horas_dia = float(data.get('horas_dia', 0))
    valor_hora = float(data.get('valor_hora', 0))
    desafio = data.get('desafio', '')

    dias_uteis = 22

    custo_mensal_manual = colaboradores * horas_dia * valor_hora * dias_uteis
    economia_estimada = custo_mensal_manual * 0.6

    if custo_mensal_manual >= 8000:
        status = "ALTA PRIORIDADE"
    elif custo_mensal_manual >= 3000:
        status = "MÉDIA PRIORIDADE"
    else:
        status = "BAIXA PRIORIDADE"

    nomes_nichos = {
        "clinica": "Clínica",
        "imobiliaria": "Imobiliária",
        "escritorio": "Escritório",
        "ecommerce": "E-commerce",
        "restaurante": "Restaurante"
    }

    sugestoes = {
        "clinica": {
            "Agendamentos manuais": "Automatizar agendamentos, confirmações de consulta e lembretes para pacientes.",
            "WhatsApp desorganizado": "Implantar atendimento automatizado com triagem, respostas rápidas e organização por etapas.",
            "Controle financeiro manual": "Automatizar cobranças, faturamento, recibos e acompanhamento financeiro da clínica."
        },

        "imobiliaria": {
            "Leads desorganizados": "Centralizar leads em um CRM imobiliário com origem, estágio e responsável comercial.",
            "Atendimento lento": "Automatizar respostas iniciais, qualificação de interessados e distribuição para corretores.",
            "Falta de CRM": "Implantar um funil comercial para acompanhar imóveis, clientes e oportunidades."
        },

        "escritorio": {
            "Planilhas manuais": "Automatizar planilhas, cadastros, consolidação de dados e geração de relatórios.",
            "Relatórios demorados": "Criar dashboards automáticos para acompanhar indicadores e reduzir trabalho manual.",
            "Processos repetitivos": "Mapear rotinas administrativas e automatizar tarefas operacionais recorrentes."
        },

        "ecommerce": {
            "Pedidos manuais": "Automatizar pedidos, notificações, integração logística e acompanhamento de entregas.",
            "Atendimento lento": "Implantar automação de suporte para dúvidas frequentes, status de pedidos e pós-venda.",
            "Controle de estoque": "Automatizar alertas de estoque, atualização de produtos e relatórios de giro."
        },

        "restaurante": {
            "Pedidos desorganizados": "Centralizar pedidos em um fluxo único para reduzir erros, atrasos e retrabalho.",
            "WhatsApp manual": "Automatizar atendimento, cardápio digital, pedidos e confirmação com clientes.",
            "Controle financeiro": "Automatizar fechamento diário, controle de vendas, custos e relatórios financeiros."
        }
    }

    sugestao_tecnica = sugestoes.get(nicho, {}).get(
        desafio,
        "Mapear processo atual e identificar automações possíveis."
    )

    diagnostico = {
        "empresa": nome,
        "responsavel": responsavel,
        "nicho": nicho,
        "segmento": nomes_nichos.get(nicho, "Não informado"),
        "status_qualificacao": status,
        "custo_mensal_estimado": round(custo_mensal_manual, 2),
        "economia_potencial_mensal": round(economia_estimada, 2),
        "economia_potencial_anual": round(economia_estimada * 12, 2),
        "economia_potencial_5_anos": round(economia_estimada * 60, 2),
        "principal_desafio": desafio,
        "sugestao_tecnica": sugestao_tecnica
    }

    data.update(diagnostico)

    print("---- Novo diagnóstico gerado ----")
    print(f"Empresa: {nome}")
    print(f"Responsável: {responsavel}")
    print(f"Segmento: {nomes_nichos.get(nicho, 'Não informado')}")
    print(f"Desafio: {desafio}")
    print(f"Custo mensal manual: R$ {custo_mensal_manual:.2f}")
    print(f"Economia estimada: R$ {economia_estimada:.2f}")
    print(f"Status: {status}")

    try:
        requests.post(MAKE_URL, json=data, timeout=10)
    except Exception as e:
        print(f"Erro ao enviar para o Make: {e}")

    return jsonify({
        "mensagem": "Diagnóstico gerado com sucesso!",
        "diagnostico": diagnostico
    }), 200


if __name__ == '__main__':
    app.run(port=5000, debug=True)