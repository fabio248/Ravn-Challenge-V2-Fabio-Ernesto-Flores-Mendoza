# Tiny Cat Store

### Implemented features

1. Authentication endpoints (sign up, sign in, sign out)
2. List products with pagination
3. Search products by category
4. Add 2 kind of users (Manager, Client)
   1. As a Manager I can:
      1. Create products
      2. Update products
      3. Delete products
      4. Disable products
      5. Upload images per product
   2. As a Client I can:
      1. See products
      2. See the product details
      3. Add products to cart
5. The product information(including images) should be visible for logged and not logged users
6. Postman documentation
7. Tests

### Installation instructions

If you want you can use docker to create the 2 databases one for test and one for development

1. git clone https://github.com/fabio248/Ravn-Challenge-V2-Fabio-Ernesto-Flores-Mendoza.git
2. npm install
3. npm run docker:up
4. configurate .env file following the .env.example

- if you use docker for db's you can take the DATABASE_URL and DATABASE_URL_TEST
- Take GOOGLE_API_FOLDER_ID from .env.example

5. npx prisma db push
6. npm run seed
7. npm run dev

### Test instructions

Before running any test

1. Open file prima/schema.prisma
2. Change in datasource db the url. You have the value of `DATABASE_URL` change it to `DATABASE_URL_TEST` and save de changes.
3. npx prisma db push.
4. npm run test

### URL for documentation

https://documenter.getpostman.com/view/24300106/2s93Jrv4Uo
