# Projeto Telecall - Interface de Plataforma CPaaS

## Descrição

Este projeto é a interface de front-end para a plataforma de **CPaaS (Communications Platform as a Service)** da Telecall. Ele oferece uma experiência de usuário para acessar e entender os diversos serviços de comunicação oferecidos, além de incluir funcionalidades de autenticação de usuário e um design moderno e responsivo.

## Funcionalidades

O projeto conta com as seguintes funcionalidades implementadas:

- **Páginas de Serviços:**
  - **2FA (Autenticação de Dois Fatores):** Página informativa sobre o serviço de 2FA.
  - **Número Máscara:** Página detalhando o serviço de mascaramento de números.
  - **Google Verified Calls:** Explicação sobre o serviço de chamadas verificadas do Google.
  - **SMS Programável:** Detalhes sobre a API de envio de SMS.
- **Autenticação de Usuário:**
  - Sistema de **Login** para usuários existentes.
  - Formulário de **Cadastro** para novos usuários.
- **Tema:**
  - Botão para alternar entre **Modo Claro** e **Modo Escuro**, com a preferência salva localmente.
- **Contato:**
  - Formulário para que os visitantes possam entrar em contato.
- **Design Responsivo:**
  - A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.

## Tecnologias Utilizadas

- **HTML5:** Para a estruturação das páginas.
- **CSS3:** Para a estilização e design, utilizando variáveis para temas.
- **JavaScript:** Para a interatividade, manipulação do DOM e lógica do lado do cliente (como a troca de tema e validações de formulário).
- **Bootstrap 5:** Framework CSS utilizado como base para a responsividade e componentes de UI.
- **Font Awesome:** Para os ícones utilizados na interface.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **`.html`:** Arquivos que representam as diferentes páginas da aplicação (ex: `inicio.html`, `login 2.html`, `servicos.html`).
- **`.css`:** Folhas de estilo dedicadas para cada página, o que permite uma estilização modularizada.
- **`.js`:** Arquivos JavaScript com a lógica específica para cada página ou funcionalidade (ex: `auth.js` para autenticação, `contato.js` para o formulário de contato).
- **Imagens:** Arquivos de imagem como `telecall.png` e ícones.

## Como Executar

Por ser um projeto de front-end estático, não há necessidade de um servidor complexo. Para visualizar o projeto:

1.  Clone este repositório para a sua máquina local.
2.  Abra um dos arquivos `.html` principais em seu navegador de preferência. Recomenda-se começar pelo `inicio.html` ou, se quiser testar o fluxo de autenticação, pelo `login 2.html`. 