import { createClient } from 'redis';

const client = createClient();

client.on('error', err => {
    console.log('Redis Client Error', err);
});

await client.connect();
console.log('Conexão com Redis estabelecida com sucesso!');

export default client;