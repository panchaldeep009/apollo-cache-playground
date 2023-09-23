A playground to test apollo memory cache interception

### Step

1. `pnpm install`
2. `docker-compose up -d`
3. `pnpm hasura migrate apply`
4. `pnpm hasura metadata apply`
5. `pnpm codegen`

### Test

1. `pnpm dev`

### Result

- React Dev Server : http://localhost:5173/
- Hasura Api : http://localhost:8383/v1/graphql
- PostgresDb Port : 5454
- Hasura Console : `pnpm hasura console`
