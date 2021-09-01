## Part 1:
### Project setup 
```
nest new project_name
```
### Initial resolver
- create module
```
nest g module pets
```

- create service
```
nest g service pets
```

- create resolver
```
nest g resolver pets
```
### Generate GraphQL schema

add config GraphQl in app module
## Part 2:
### Database integration with Prisma
```
npx prisma init
```
- install and generate Prisma Client
```
npm i @prisma/client
```
or
```
npx prisma generate
```
### Querying the database

## Part 3:
### Mutations
### Validation
### Auto generate all the things 
### Db relationship

## Notes:
Prisma require using mongo support transaction (mongo replica set)