## Description

**Web3 Direct Messaging API demo** built with Nest.js.

Example real-world project like this is https://chat.blockscan.com/, wallet-to-wallet web3 messaging platform, where any ETH-wallet holders can send messages to other wallet holders. 

Thus, this apdots a signature-based JWT authentcation. The process is like here;
1) Wallet holder signs a time-based message and get a singature
2) Call a login endpoint with the signature and address and receive a JWT access token
3) Send the other API requests using that JWT token through Bearer Authentication


Features:
- `[POST] /conversations/start` - Start a conversation
- `[PUT] /conversations/approve` - Approve a conversation
- `[PUT] /conversations/reject` - Reject a conversation
- `[POST] /messages` - Send a message
- `[GET] /conversations` - Get all conversations for specific user
- `[GET] /messages/conversation/:conversationId` - Fetch messages for specific conversation (paginated api)

## Tech stack

- Nest.js
- Prisma
- Postgres
- JWT authentication

## Database

As defined in [schema](./prisma/schema.prisma), there are 2 main tables; `conversation` and `message`, with 1:n relationship.

## Installation

```bash
$ pnpm install

# Prepare .env
$ cp .env.example .env

# DB setup
$ pnpm db:setup
```

## Running the app

```bash
# development
$ pnpm run start:dev

# production mode
$ pnpm build
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
