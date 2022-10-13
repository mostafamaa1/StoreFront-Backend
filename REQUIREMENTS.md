# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

### Users

| FUNCTION |  METHOD |        ROUTE      |                 DESCRIPTION               | TOKEN REQUIRED |
|:-----------:|:--------:|------------|------------------------------------------------------------------|:--------------:|
|     Index   |    GET   | /users     | Show all users                |      TRUE      |
|      Show   |    GET   | /users/:id | Shows a user by id   |      TRUE      |
|     Create  |   POST   | /users     | Create new User     |      FALSE     |
|     Auth  |   POST   | /users/auth     | Authenticates user information     |      FALSE     |
|     Update  |    PUT   | /users/:id | Update a user by ID    |      TRUE      |
|     Delete  |  DELETE  | /users/:id | Delete a user by ID     |      TRUE      |
### Products

| FUNCTION |  METHOD |        ROUTE      |                 DESCRIPTION               | TOKEN REQUIRED |
|:------------------:|:--------:|--------------------|-----------------------------------|:--------------:|
|         Index      |    GET   | /products          | Shows all products                 |      FALSE     |
|         Show       |    GET   | /products/:id      | Shows a product by ID    |      FALSE     |
|        Create      |   POST   | /products          | Create new Product                |      TRUE      |
|        Update      |    PUT   | /products/:id      | Update product by ID          |      TRUE      |
|        Delete      |  DELETE  | /products/:id      | Delete product by ID          |      TRUE      |




### Orders

| FUNCTION |  METHOD |        ROUTE      |                 DESCRIPTION               | TOKEN REQUIRED |
|:--------------------------:|:--------:|------------------|------------------------------------------|:--------------:|
|             Index          |    GET   | /orders          | Show all orders                          |      FALSE      |
|             Show           |    GET   | /orders/:id      | Shows an order by ID             |      FALSE      |
|        Show By User ID     |    GET   | /orders/user/:id | Shows orders by User ID           |      TRUE      |
|            Create          |   POST   | /orders          | Create new Order                          |      FALSE      |
|            Update          |    PUT   | /orders/:id      | Update an order by ID                 |      TRUE      |
|            Delete          |  DELETE  | /orders/:id      | Delete an order by ID                 |      TRUE      |


###  Orders Products

|  FUNCTION |  METHOD |        ROUTE      |                 DESCRIPTION               | TOKEN REQUIRED |
|:-----------:|:--------:|:-------------------:|:------------------------------------------:|:--------------:|
|      Show   |    GET   | /orders/:id/products | Shows all details about an order by id |      TRUE      |
|     Create  |   POST   | /orders/:id/products     | Add products to existing orders                 |      TRUE      |


## Data Shapes
#### Product
```hs
-  id SERIAL PRIMARY KEY
- name VARCHAR(50)
- price INTEGER
- type VARCHAR(50)
```

#### User
```hs
- id SERIAL PRIMARY KEY
- username VARCHAR(100)
- firstname VARCHAR(100)
- lastname VARCHAR(100)
- password VARCHAR(100)
```

#### Orders
```hs
- id SERIAL PRIMARY KEY
- status VARCHAR(50)
- user_id INTEGER REEFRENCES users(id) ON DELETE SET NULL
```

#### order_products
```hs
- id SERIAL PRIMARY KEY
- quantity INTEGER
- product_id INTEGER REEFRENCES products(id) ON DELETE SET NULL
- order_id INTEGER REEFRENCES orders(id) ON DELETE SET NULL
```


