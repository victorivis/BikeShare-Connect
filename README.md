# Inicialização

Primeiramente, deve ser criado um arquivo .env seguindo o padrão abaixo

```
MONGO_URL=<URL_do_cluster>
JWT_SECRET=<senha_secreta_para_o_token>
```

Também é necessário instalar o redis-stack para o cache da aplicação. Caso não tenha ele basta, com o docker inicializado, rodar o comando.

```
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

Uma vez instalado o redis-stack pode ser inicializado posteriormente usando.

```
docker start redis-stack
```

Em seguida basta rodar os comandos para instalação das dependências e inicializacao do servidor, respectivamente.

```
npm install
npm run typescrit
```

Os charts da aplicação podem ser visualizados no navegador pelo link a seguir:

```
https://charts.mongodb.com/charts-project-0-adkwqon/public/dashboards/67af8e19-a0ce-4968-889e-acf47d0db00b
```