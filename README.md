# Inicialização

Primeiramente, deve ser criado um arquivo .env seguindo o padrão abaixo

```
POSTGRES_USER = postgres
POSTGRES_PASSWORD = postgres
POSTGRES_HOST = localhost
POSTGRES_PORT = 5432
POSTGRES_DB = bikeshare
POSTGRES_DIALECT = postgres
```

Em seguida basta rodar os comandos para instalação das dependências e criação do banco de dados, respectivamente.

```
npm install
npm run criarDB
```