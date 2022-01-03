# **CSI606-2021-01 - Remoto - Trabalho Final - Resultados**
## *Aluna(o): Marcos Henrique Santos Cunha*

--------------

<!-- Este documento tem como objetivo apresentar o projeto desenvolvido, considerando o que foi definido na proposta e o produto final. -->

### Vote.it

  Vote.It é um sistema de votação generalista, que permite a criação e gerência de votações, bem como a participação nas mesmas e a visualização de resultados posteriores. Lembrando que todos os votos são secretos, e nem mesmo o sistema sabe quem votou em quem, tornando o processo completamente seguro.

<!-- Apresentar o tema. -->
### Tema

  O trabalho final tem como tema o desenvolvimento de um aplicativo de votação generalista, que permita com que as pessoas participem de votações, criem e gerenciem votações, bem como visualizem seus resultados de forma simples e direta.

### 1. Funcionalidades implementadas

Criação de conta de usuário, gerenciamento de votações, participação em votações e resultado de votações
  
### 2. Funcionalidades previstas e não implementadas
<!-- Descrever as funcionalidades que eram previstas e não foram implementas, apresentando uma breve justificativa do porquê elas não foram incluídas -->

Restrição por e-mail e registro por CPF. Não foram implementadas devido ao tempo disponível, com diversos trabalhos da disciplina.

### 3. Principais desafios e dificuldades
<!-- Descrever os principais desafios encontrados no desenvolvimento do trabalho, quais foram as dificuldades e como elas foram superadas e resolvidas. -->
Principalmente aprender a trabalhar com cookies, foram feitas muitas pesquisas para entender como o contexto de cookies funciona nos navegadores e servidores.

### 4. Instruções para instalação e execução
<!-- Descrever o que deve ser feito para instalar (ou baixar) a aplicação, o que precisa ser configurando (parâmetros, banco de dados e afins) e como executá-la. -->
Para o banco de dados, instale o PosgreSQL na sua máquina, e crie um arquivo chamado .env na pasta do backend (backend/), com o seguinte conteudo:

DATABASE_URL="postgresql://postgres:12345@localhost:5432/voteit"
ACCESS_TOKEN_SECRET=i2CSy_KOuWn666DaNjNqRgbZIplf5SemkhNDLxzZ1890ccjky7XZQ6sy-9xesRkzjTJ_wN9Pt1l8IAdzKAByWXuv6TNmRkAPNCm-si21fY3UwLyYaLjWXUuhgOdvEp-eneqHdc38k0RkYyHhsO_z-j3KeM9BpV5oSDYBtVqhaK8
BCRYPT_SECRET=i2CSy_KOuWn666DaNjNqRgbZIplf5SemkhNDLxzZ1890ccjky7XZQ6sy-9xesRkzjTJ_wN9Pt1l8IAdzKAByWXuv6TNmRkAPNCm-si21fY3UwLyYaLjWXUuhgOdvEp-eneqHdc38k0RkYyHhsO_z-j3KeM9BpV5oSDYBtVqhaK1
REFRESH_TOKEN_SECRET=i2CSy_KOuWn666DaNjNqRgbZIplf5SemkhNDLxzZ1890ccjky7XZQ6sy-9xesRkzjTJ_wN9Pt1l8IAdzKAByWXuv6TNmRkAPNCm-si21fY3UwLyYaLjWXUuhgOdvEp-eneqHdc38k0RkYyHhsO_z-j3KeM9BpV5oSDYBtVqhaK9

Na database url você pode colocar as suas credenciais do seu banco.

É necessário que você tenha o node js instalado, e também o gerenciador de pacotes yarn. Para rodar o back-end, entre no diretório backend/ e rode os seguintes comandos:

npm install
npm install -g prisma
npx prisma generate
npm start

E o back-end estará rodando. Para o frontend, entre na pasta frontend/ e rode

yarn install
yarn start

E tudo pronto.

IMPORTANTE: O backend precisa rodar na porta 3001 e o frontend precisa rodar na porta 3000, por questões de cookies. Se você rodar eles em outra portas, não vai funcionar. É só não mexer em nada, eles por padrão irão pra essas portas.


