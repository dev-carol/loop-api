# Loop

Bem-vindo ao projeto **Loop** ! Este projeto é construído com Nest.js, Prisma, Docker e Swagger para criar uma API dinâmica de interações sociais contínuas. Aqui você poderá criar seu usuário, se autenticar e começar a criar suas postagens

## Requisitos

Antes de rodar o projeto, você precisará ter o Docker, Docker compose e o Node.js instalados em sua máquina.

## Configuração

1. Clone este repositório para sua máquina.
2. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
POSTGRES_USER=YOURUSER
POSTGRES_PASSWORD=YOURPASSWORD
POSTGRES_DB=loop
JWT_SECRET=seuSegredoJWT
DATABASE_URL="postgresql://{USER}:{YOURPASSWORD}@localhost:5432/loop?schema=public"

```

Certifique-se de definir JWT_SECRET como um segredo seguro para assinar tokens JWT.
dica: rode no seu terminal :

```
openssl rand -base64 32

```

## Rodando o Projeto

1. Abra um terminal na pasta do projeto.
2. Execute o seguinte comando para iniciar o servidor:

```
npm install
docker compose up -d
npm run start:dev
```

## Acessando pelo Prisma Studio

O Prisma Studio é uma ferramenta de gerenciamento de banco de dados que fornece uma interface visual para interagir com seu banco de dados. Para acessá-lo:

1. Abra um terminal na pasta do projeto.
2. Execute o seguinte comando:

```
npm install prisma --save-dev
npm install @prisma/client
npx prisma migrate dev --name init
npx prisma
npx prisma studio

```

Você irá se conectar com o Prisma e Prisma Studio em seu navegador.

E nesse momento, você poderá conectar com seu banco de dados local e fazer as interações na api

## Swagger

A documentação da API é gerada automaticamente usando Swagger. Para acessá-la:

1. Abra um navegador.
2. Vá para http://localhost:5001/api.

## Tecnologias Utilizadas

- Nest.js
- Prisma
- Docker
- Swagger

## Autenticação

Para autenticar :

1. Realize uma solicitação POST para http://localhost:5001/auth/login com o seguinte corpo JSON:

```{
  "email": "seu_email@example.com",
  "password": "sua_senha"
}
```

1. Você receberá um token de acesso no corpo da resposta.
2. Use o token de acesso para fazer solicitações autenticadas, adicionando um cabeçalho Authorization.A palavra Bearer já está tratada, então basta só adicionar o Token

## Desenvolvido por:

Carol Santos