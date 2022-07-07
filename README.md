

## Installation
1. Rename env.example to .env
2. If needed apply changes in .env file. Each .env file have PORT variable (by default it's 4200 in each service)
3. You can install node modules by:
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Using

1. Open GraphQL Playground:
http://localhost:4200/graphql
2. Follow this [link](https://github.com/cheerfulperson/graphql-service/blob/graphql-playground/playground.graphql) and open the file with all querys and mutations. Paste the code into GraphQL Playground.
3. Making a "jwt" request to get a {{jwt token}} (if you are't registered, then register)
4. Set headers in a tab `HTTP HEADERS` 
```
{
  "Authorization": "Bearer {{jwt token}}"
}
```
5. Check functionality
