# Scrapays Backend Assessment

Backend repository for the Scrapays assessment

## Features

- Secure auth with Auth0
- CRUD operations for books
- GraphQL for data management
- SQLite for data persistence

## Tech Stack

- NestJS
- SQLite
- JWT (for authentication)
- TypeScript
- Jest (for testing)
- Prisma (for database ORM)

## Directories

- [src/](src) - Main application source code
  - `common/` - Common utilities and shared code
  - `core/` - Core application logic and services
  - `modules/` - Feature modules and route definitions
  - `types/` - TypeScript type definitions
  - `app.module.ts` - Main application module
  - `main.ts` - Server entry point

### Database

- [prisma/](prisma)
  - `migrations/` - Database migration files
  - `schema.prisma` - Prisma schema definition

## Getting Started

1. Clone the repository
2. Install dependencies: `npm i`
3. Set up environment variables (see `.env.example`)
4. Run migrations: `npx prisma migrate dev`
5. Generate Prisma Client: `npx prisma generate`
6. Start the server: `npm run start:dev`

## Testing

- Run unit tests: `npm run test`

## GraphQL Playground

Once the server is running, you can access the GraphQL Playground at:

- **Local**: http://localhost:PORT_NUMBER/graphql

### Authentication Headers

To test authenticated endpoints, add the following headers in the Playground:

```json
{
  "Authorization": "Bearer YOUR_AUTH0_TOKEN"
}
```
