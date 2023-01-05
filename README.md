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
- Tailwind css
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

<br/>

<div>
  <img src="https://user-images.githubusercontent.com/90735982/210674971-5db3e255-0fdb-4019-89e0-cc9da12456db.png" width="800" />
  <img src="https://user-images.githubusercontent.com/90735982/210674975-14b6434d-2ce2-4d98-88de-95cf3431d310.png" width="800" />
  <img src="https://user-images.githubusercontent.com/90735982/210676102-5c1f982c-0751-4af3-a245-ff5d611a96be.png" width="800" />
</div>

<br/>

Após ativar os serviços adicione a seguinte regra no firestore database, isso vai assegurar que apenas usuários autenticados e donos do conteúdo possam fazer alterações na ramificação.

<br/>

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

<img src="https://user-images.githubusercontent.com/90735982/210676587-3e015bd7-ee08-4f7f-a7cf-66046bb7932a.png" width="800" />

<br/>

Agora é preciso registrar o seu projeto web e adicionar as váriaveis de ambiente.

Na visão geral do proejto você vai encontrar uma aba para adicionar seu projeto web:

<br/>

![Captura de Tela (91)](https://user-images.githubusercontent.com/90735982/210679354-df26864b-09d8-47d9-a4e6-63b6fb0a12be.png)

<br/>

Observe conjunto de pares chave-valor. Eles serão substituidos no arquivo .env.local que iremos criar a seguir.

<br/>

![Captura de Tela (93)](https://user-images.githubusercontent.com/90735982/210679711-56e30552-e675-40b0-b7b3-b8286e34f279.png)

<br />

No diretório do projeto crie um arquivo com o seguinte nome: .env.local

Seu arquivo deve seguir essa estrutura:

<br />

![env](https://user-images.githubusercontent.com/90735982/210680103-3ccec2ad-9343-4354-9a53-c690733e28ad.png)

<br />

Lembrando que os valores após "=" devem ser os seus, aqueles mostrados no momento de registrar o app web.

### Baixar dependências

Feito todo esse processo, você esta pronto para começar.

Nessa etapa é preciso ter instalado na sua máquina o nodejs + npm.

No terminal:

```
npm i
```

```
npm run dev
```

Caso não possua o npm e o nodejs, você pode baixar <a href="https://nodejs.org/en/" target="_blank">aqui</a>.
