<h1 align=center> 
    
    Graphql Jwt Auth Demo
</h1>

## About

This project contains a Users CRUD and a basic login-password jwt authentication. Once you log in the `access-token` cookie is stored on you environment allowing you to acess the `me` query. 

## Requirements

- Docker and Docker Compose
- Node.js

<h1>

## Running

```sh
npm start
```
## Examples

```gql
mutation CreateUser($newUser: UserCreateInput!) {
  register(input:$newUser) {
    name
  }
}

mutation Login($loginInput: LoginInput!) {
  login (input: $loginInput) {
    name
    email
  }
}

query AuthRequiredQuery {
  me {
    id
    name
  }
}
```