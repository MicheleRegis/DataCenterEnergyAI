# DataCenter Energy AI Dashboard

[Português](#-português) | [English](#-english)

---


### 📖 Description

**DataCenter Energy AI** is an advanced, real-time dashboard for intelligent energy consumption monitoring in data centers. The project was designed to visualize and manage energy efficiency with a focus on **ISO 50001** compliance and optimizing Artificial Intelligence workloads.

The dashboard provides a detailed comparison between two conceptual data center models:
1.  **GreenCore (Terrestrial):** A high-efficiency data center located near Amsterdam, focusing on low PUE (Power Usage Effectiveness) and heat reuse.
2.  **Poseidon Blue (Underwater):** An innovative, modular underwater data center off the coast of Portugal, which uses the ocean for natural cooling and is powered by 100% renewable energy.

---

### ✨ Key Features

- **Real-Time Monitoring:** Dynamic visualization of metrics like PUE, total power consumption, AI load, and environmental conditions.
- **Advanced Data Visualization:** Interactive and informative charts built with `Recharts` to analyze energy trends and distributions.
- **Detailed Panels:** Dedicated tabs for:
  - **Overview:** A complete summary of the data center's health and efficiency.
  - **AI Workloads:** Analysis of energy consumption by AI workload type.
  - **ISO 50001:** Tracking compliance status with the standard's requirements.
  - **EnPI & Targets:** Trends of Energy Performance Indicators (EnPI) and targets.
  - **Comparison:** A performance comparison between the terrestrial and underwater models.
  - **System Controls:** A control panel for automations, operational status, and a 3D geographic view of the data centers.
- **Responsive and Modern Design:** A fully responsive and aesthetically pleasing interface built with **Tailwind CSS**.
- **Light & Dark Theme:** A toggle to switch between viewing modes, with user preference persistence.
- **Fluid Animations:** Subtle transitions and animations with `Framer Motion` for an enhanced user experience.

---

### 🛠️ Technologies Used

- **Frontend:** [React](https://reactjs.org/) (with Hooks)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

### 🚀 How to Run the Project

Follow the steps below to set up and run the project in your local development environment.

#### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Yarn](https://yarnpkg.com/) (package manager)

#### Installation

1.  Clone the repository (or download the files):
    ```bash
    git clone <REPOSITORY_URL>
    ```
2.  Navigate to the project directory:
    ```bash
    cd datacenter-energy-ai
    ```
3.  Install the dependencies:
    ```bash
    yarn install
    ```

#### Running in Development Mode

1.  Start the development server:
    ```bash
    yarn dev
    ```
2.  Open your browser and go to `http://localhost:5173` (or the address shown in your terminal).

---

### 📂 File Structure

The main project structure is organized as follows:

```
/
├── public/
│   └── ... # Static files
├── src/
│   ├── components/
│   │   ├── DataCenterEnergyAI.tsx   # Main dashboard component
│   │   └── SystemControls.tsx       # Component for the controls tab
│   ├── App.tsx                      # Root application component
│   ├── main.tsx                     # React application entry point
│   └── index.css                    # Global styles and Tailwind config
├── package.json
└── README.md
```

---

### 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more details.

<br>
<br>

---



### 📖 Descrição

**DataCenter Energy AI** é um painel de controle avançado e em tempo real para o monitoramento inteligente do consumo de energia em data centers. O projeto foi desenvolvido para visualizar e gerenciar a eficiência energética com foco na conformidade com a norma **ISO 50001** e na otimização de cargas de trabalho de Inteligência Artificial.

O dashboard apresenta uma comparação detalhada entre dois modelos conceituais de data center:
1.  **GreenCore (Terrestre):** Um centro de dados de alta eficiência localizado próximo a Amsterdã, focado em PUE (Power Usage Effectiveness) baixo e reutilização de calor.
2.  **Poseidon Blue (Subaquático):** Um data center modular e inovador na costa de Portugal, que utiliza o oceano para refrigeração natural e é alimentado 100% por energia renovável.

---

### ✨ Funcionalidades Principais

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

### 🛠️ Tecnologias Utilizadas

- **Frontend:** [React](https://reactjs.org/) (com Hooks)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Visualização de Dados:** [Recharts](https://recharts.org/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)

---

### 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local.

#### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) (gerenciador de pacotes)

#### Instalação

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

#### Executando em Modo de Desenvolvimento

1.  Inicie o servidor de desenvolvimento:
    ```bash
    yarn dev
    ```
2.  Abra seu navegador e acesse `http://localhost:5173` (ou o endereço indicado no terminal).

---

### 📂 Estrutura de Arquivos

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

### 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
