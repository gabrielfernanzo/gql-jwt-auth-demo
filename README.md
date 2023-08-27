<h1 align=center> 
    
    Graphql Jwt Auth Demo 🚀
</h1>

<h2 align=center>
    <code>🔎 Description</code>
</h2>

This project contains a few user operations and also a basic login-password jwt authentication. Once you log in the `access-token` cookie is stored on you environment allowing you to acess the `me` query. 

<h2 align=center>
    <code>✅ Requirements</code>
</h2>

- [Docker and Docker Compose](https://docs.docker.com/desktop/install/mac-install/)

---

<h2 align=center>
    <code>🐳 Running</code>
</h2>

```sh
docker-compose up -d
```


<details>   
    <summary><h2>📝 Resources Example</h2></summary>

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
</details>
