# TodoList

## Resumo

TodoList é uma aplicação react que possui autenticação firebase e base de dados através do firestore. Sendo assim, cada usuário possui o seu armazenamento pessoal de <i>Todos</i> (tarefas).

## Pricipais funcionalidades

- CRUD das <i>Todos</i> por meio do firestore
- Criar nova conta
- Autenticar conta já existente

## Pricipais tecnologias

- Firebase
- TypeScript
- React
- React Toastify
- RadixUi
- Phospor-icons
- React-router-dom

## Preview

![Screen Shot 2023-01-04 at 20 55 36](https://user-images.githubusercontent.com/90735982/210672603-a000d604-8393-4ee6-b8b9-4b599daa1032.png)
![Screen Shot 2023-01-04 at 20 55 39](https://user-images.githubusercontent.com/90735982/210672606-267543b6-4392-4baf-a839-1d79925ce587.png)
![Screen Shot 2023-01-04 at 20 55 51](https://user-images.githubusercontent.com/90735982/210672610-45f3ee8f-1469-4b59-b4f7-c28852cf2772.png)

## Executando o projeto de forma local

### Configuração do firebase

Primeiro, é preciso criar uma conta no firebase e configurar alguns serviços.

Após criar a conta, crie um novo projeto e adicione os serviços de autenticação e firestore database.

No serviço de autenticação só é utilizado a validação por email e senha, adicione-o no projeto.

<div>
  <img src="https://user-images.githubusercontent.com/90735982/210674971-5db3e255-0fdb-4019-89e0-cc9da12456db.png" width="800" />
  <img src="https://user-images.githubusercontent.com/90735982/210674975-14b6434d-2ce2-4d98-88de-95cf3431d310.png" width="800" />
</div>

Após ativar os serviços adicione a seguinte regra no firestore database, isso vai assegurar que apenas usuários autenticados e donos do conteúdo possam fazer alterações na ramificação.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow only authenticated content owners access
    match /users/{userId}/todos/{documents=**} {
      allow read, write, delete: if request.auth != null && request.auth.uid == userId
    }
  }
}
```
