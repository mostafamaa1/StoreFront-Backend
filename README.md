# Storefront Backend Project

## Introduction

This project uses NodeJs, express and postgres SQL. CRUD actions are available for all tables.

 New users can signUp and Login and create new orders. Admin can create, update and delete products, orders and users. 

 To run and access all functionalities navigate to `localhost:3000/` enter the valid parmeters and HTTP request method(POST, GET, PUT, DELETE).


## Getting Started

The project can be built and run in the following ways

### 1. Install all dependencies

`npm i`

### 2. Build

`npm run build`

This command will build the typeScript code into JavaScript and save them in the `./build` folder.

### 3. Start the Server after Build

`npm run start` (For Development)  
 AND  
`npm run start:prod` (For Production)

This command will start the server running on port `3000`.

* -> Check `Package.json` for information.

## Testing and Linting

Here, I will show you how to run the test and also how to check that our code respects all the eslint rules.

### 1. Formating and Linting

`npm run format`

This script contains formating and linting the application.

### 2. Testing

`npm run test:db`

This script sets `ENV=test` and runs migrations to reset and create test database and tables, then builds the application and runs testing using jasmine.
## ENVIRONMENT VARIABLES 
`ENV=dev`  
`PORT=3000`  
`DB_HOST=localhost`     
`DB_PORT=5432`  
`DB_DATABASE=database_dev`  
`DB_DATABASE_TEST=database_test`   
`DB_USER=postgres`  
`DB_PASS=admin`
`BCRYPT_PASSWORD=your-secret-password`
`SALT_ROUNDS=10`  
`TOKEN_SECRET=your-secret-token`

##   DB Creation and Migrations
#### Database
`CREATE DATABASE database_dev;`   
`CREATE DATABASE database_test;`

#### Migrations used to Create a Tables in Database
`db-migrate up`

#### Migrations used to make Drop a Tables in Database
`db-migrate down`

#### Migrations used in this project

`db-migrate create add-users-table --sql-file`  
`db-migrate create add-products-table --sql-file`  
`db-migrate create add-orders-table --sql-file`  
`db-migrate create add-ordered-products-table --sql-file`

## Technologies Used

- [NodeJS](https://nodejs.org/en/) - The JavaScript runtime.
- [Express](https://expressjs.com/) - The web framework.
- [TypeScript](https://www.typescriptlang.org/) - The language used.
- [Jasmine](https://jasmine.github.io/) - The Testing framework used.
- [PostgreSql](https://www.postgresql.org/) - The database used
- [Postman](https://www.postman.com/) - The program used to build and test my APIs

#### Created By Mostafa Ahmed


