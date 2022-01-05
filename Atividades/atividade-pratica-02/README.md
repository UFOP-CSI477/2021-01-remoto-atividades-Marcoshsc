Essa atividade foi feita com React e express, não PHP. Portanto siga os seguintes passos para rodar tudo:
PS: Importante que vc tenha o node e o npm instalados, bem como o yarn também (npm install -g yarn).

No backend: entre na pasta e rode isso aqui

    npm install
    npm install -g prisma
    npx prisma migrate dev
    npx prisma generate
    npm start

Show. Agora no front end:

    yarn install
    yarn start
    
Tudo rodando. Algumas informações importantes:

Utiliza-se arquitetura MVC, onde:
View: ReactJS
Model: PrismaJS
Controller: ExpressJS

Além disso, autenticação habilitada também, usando JWT e sua transferência é dada via cookies.
ESSENCIAL: Não troque as portas de execução da aplicação. Por causa dos cookies serem httpOnly, é estritamente necessário que o frontend rode na porta 3000 e que o back end rode na porta 3001.
