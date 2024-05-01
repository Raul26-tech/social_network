# UnityNetwork

Este é um projeto de uma rede social onde a aplicação permite que os usuários se cadastrem, façam login, postem mensagens, sigam outros usuários e interajam por meio de comentários.

## Tecnologias utilizadas

- ``Node js``
- ``Typescript``
- ``Èxpress js``
- ``Typeorm``
- ``PostgreSQL``
- ``Json Web Token (JWT)``
- ``Inversify``

## Funcionalidades Principais

- **Cadastro e Login de Usuários**: Os usuários podem se cadastrar com um e-mail e senha, e fazer login posteriormente.
- **Postagem de Mensagens**: Os usuários autenticados podem criar e compartilhar mensagens com outros usuários.
- **Seguindo Usuários**: Os usuários podem seguir outros usuários para acompanhar suas atividades na rede.
- **Comentários em Posts**: Os usuários podem interagir uns com os outros comentando nas postagens.

## Como Usar

1. Clone o repositório:

```bash
git clone https://github.com/Raul26-tech/social_network.git
```
2. Instale as depedências:

```bash
cd social_network
npm install
```

3. Configure as variáveis de ambiente:
   
- Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis de ambiente:
```bash
PORT=3000
DB_CONNECTION=your_database_connection_string
JWT_SECRET=your_jwt_secret
```
Substitua your_database_connection_string pela string de conexão do seu banco de dados e your_jwt_secret por uma chave secreta para assinar tokens JWT.

4. Inicie o servidor
```bash
npm start
```

A aplicação estará disponível em http://localhost:3000.

Tecnologias Utilizadas
JavaScript
Typescript
Node.js
Express.js
PostgreSQL
JWT (JSON Web Tokens)
Typeorm

## Contribuindo
Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a Licença MIT.




