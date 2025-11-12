# DataCenter Energy AI Dashboard



## 📖 Descrição

**DataCenter Energy AI** é um painel de controle avançado e em tempo real para o monitoramento inteligente do consumo de energia em data centers. O projeto foi desenvolvido para visualizar e gerenciar a eficiência energética com foco na conformidade com a norma **ISO 50001** e na otimização de cargas de trabalho de Inteligência Artificial.

O dashboard apresenta uma comparação detalhada entre dois modelos conceituais de data center:
1.  **GreenCore (Terrestre):** Um centro de dados de alta eficiência localizado próximo a Amsterdã, focado em PUE (Power Usage Effectiveness) baixo e reutilização de calor.
2.  **Poseidon Blue (Subaquático):** Um data center modular e inovador na costa de Portugal, que utiliza o oceano para refrigeração natural e é alimentado 100% por energia renovável.

---

## ✨ Funcionalidades Principais

- **Monitoramento em Tempo Real:** Visualização dinâmica de métricas como PUE, consumo total de energia, carga de IA e condições ambientais.
- **Visualização de Dados Avançada:** Gráficos interativos e informativos construídos com `Recharts` para analisar tendências e distribuições de energia.
- **Painéis Detalhados:** Abas dedicadas para:
  - **Overview:** Um resumo completo da saúde e eficiência do data center.
  - **AI Workloads:** Análise do consumo de energia por tipo de carga de trabalho de IA.
  - **ISO 50001:** Acompanhamento do status de conformidade com os requisitos da norma.
  - **EnPI & Targets:** Tendências dos Indicadores de Desempenho Energético (EnPI) e metas.
  - **Comparison:** Um comparativo de desempenho entre os modelos terrestre e subaquático.
  - **System Controls:** Um painel de controle para automações, status operacional e uma visualização geográfica em 3D dos data centers.
- **Design Responsivo e Moderno:** Interface totalmente responsiva e esteticamente agradável, construída com **Tailwind CSS**.
- **Tema Claro e Escuro:** Botão para alternar entre os modos de visualização, com persistência da escolha do usuário.
- **Animações Fluidas:** Transições e animações sutis com `Framer Motion` para uma experiência de usuário aprimorada.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React](https://reactjs.org/) (com Hooks)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Visualização de Dados:** [Recharts](https://recharts.org/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) (gerenciador de pacotes)

### Instalação

1.  Clone o repositório (ou baixe os arquivos):
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd datacenter-energy-ai
    ```
3.  Instale as dependências:
    ```bash
    yarn install
    ```

### Executando em Modo de Desenvolvimento

1.  Inicie o servidor de desenvolvimento:
    ```bash
    yarn dev
    ```
2.  Abra seu navegador e acesse `http://localhost:5173` (ou o endereço indicado no terminal).

---

## 📂 Estrutura de Arquivos

A estrutura principal do projeto está organizada da seguinte forma:

```
/
├── public/
│   └── ... # Arquivos estáticos
├── src/
│   ├── components/
│   │   ├── DataCenterEnergyAI.tsx   # Componente principal do dashboard
│   │   └── SystemControls.tsx       # Componente para a aba de controles
│   ├── App.tsx                      # Componente raiz da aplicação
│   ├── main.tsx                     # Ponto de entrada da aplicação React
│   └── index.css                    # Estilos globais e configuração do Tailwind
├── package.json
└── README.md
```

---

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
