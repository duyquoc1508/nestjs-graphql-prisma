## Part 1:
### Project setup 
```
nest new project_name
```
### Initial resolver (create partial)
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

### For quickly creating a CRUD controller with the validation built-in, you may use the CLI's CRUD generator (create full module with module, controller, service, dto,...) 
```
nest g resource [name].
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
Nếu sử dụng prisma thì không cần file service mà query trực tiếp trong resolver cũng được

### Folder dto
- `REST API` => *.dto.ts
- `GraphQR` => *.input.ts

### Common error
1. exists a field require in .prisma but not exists in db. Trường hợp thay đổi schema.prisma. nếu dữ liệu cũ không có field mới mà field mới require trong schema.prisma thì sẽ bị lỗi này

![common error 1](images/common-error1.png)

2. Lỗi này do khai báo type không hợp lệ. input hoặc return giữa prisma và service không khớp

![common error 2](images/common-error2.png)