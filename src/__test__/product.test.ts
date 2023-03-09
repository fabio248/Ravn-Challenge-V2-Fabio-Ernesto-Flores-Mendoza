import request from 'supertest';
import { db } from '../utils/db/db.server';
import { app, server } from '../index';

describe('Product endpoint', () => {
  let newProduct, product, category;
  beforeAll(async () => {
    await db.$connect();
    category = await db.category.create({
      data: { name: 'category 1', description: 'Description category' },
    });

    await db.product.createMany({
      data: [
        {
          name: 'Product 1',
          description: 'Description 1',
          price: 10,
          stock: 5,
          folderId: 'folderejemplo',
          urlFolder: 'url.com',
          categoryId: category.id,
        },
        {
          name: 'Product 2',
          description: 'Description 2',
          price: 20,
          stock: 15,
          folderId: 'folderejemplo',
          urlFolder: 'url.com',
          categoryId: category.id,
        },
        {
          name: 'Product 3',
          description: 'Description 3',
          price: 30,
          stock: 10,
          folderId: 'folderejemplo',
          urlFolder: 'url.com',
          categoryId: category.id,
        },
      ],
    });
    newProduct = await db.product.create({
      data: {
        name: 'Product 4',
        description: 'Description 1',
        price: 10,
        stock: 5,
        folderId: 'folderejemplo',
        urlFolder: 'url.com',
        categoryId: category.id,
      },
    });
  });

  afterAll(async () => {
    await db.$disconnect();
    await db.$executeRaw`TRUNCATE TABLE "product" CASCADE`;
    await db.$executeRaw`TRUNCATE TABLE "category" CASCADE`;
    server.close();
  });
  //Define the data required for the test
  beforeEach(() => {
    product = {
      name: 'Producto de prueba',
      description: 'Este es un producto creado para pruebas',
      price: 9.99,
      categoryId: category.id,
      stock: 15,
    };
  });
  const tokenManager =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcwLCJyb2xlIjoiTUFOQUdFUiIsImlhdCI6MTY3ODEzNTE0Mn0.Cs-0SDeSjojdHXe0n9QLQPDKnZuQXO95NEQCRMMZtYc';
  const tokenClient =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJDTElFTlQiLCJpYXQiOjE2NzgzMjg3ODR9.2ojPznCDhGlnO7UdtX14SEeTd4-UyIF4a2db8K7LLt0';
  const file = {
    fieldname: 'image',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    buffer: Buffer.from('test'),
    size: 4,
  };
  describe('GET /products', () => {
    it('should return all products', async () => {
      const response = await request(app).get('/api/products');
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(4);
    });
    it('should return products with offset and limit', async () => {
      const response = await request(app).get('/api/products').query({
        offset: 1,
        limit: 2,
      });
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].name).toBe('Product 2');
      expect(response.body.data[1].name).toBe('Product 3');
    });
    it('should return products by category', async () => {
      //Create new category
      const category = await db.category.create({
        data: { name: 'Category', description: 'description category' },
      });
      //update product category id
      await db.product.update({
        where: { id: newProduct.id },
        data: { categoryId: category.id },
      });
      const response = await request(app)
        .get('/api/products')
        .query({ categoryId: category.id });
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe(newProduct.name);
    });
  });
  describe('POST /products', () => {
    it('should create a new product, folder in google drive and upload image', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', tokenManager)
        .field('name', product.name)
        .field('description', product.description)
        .field('price', product.price)
        .field('categoryId', product.categoryId)
        .field('stock', product.stock)
        .attach('image', file.buffer, file.originalname);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('created new product');
      expect(response.body.data.name).toBe(product.name);
      expect(response.body.data.description).toBe(product.description);
      expect(response.body.data.price).toBe(`${product.price}`);
      expect(response.body.data.categoryId).toBe(product.categoryId);
      expect(response.body.data.folderId).toBeDefined();
      expect(response.body.data.urlFolder).toBeDefined();
    });

    it('should return status 400 if no image is attached', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', tokenManager)
        .field('name', product.name)
        .field('description', product.description)
        .field('price', product.price)
        .field('categoryId', product.categoryId)
        .field('stock', product.stock);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Should upload at least one image');
    });

    it('should return status 401 if no token is set', async () => {
      const response = await request(app)
        .post('/api/products')
        .field('name', product.name)
        .field('description', product.description)
        .field('price', product.price)
        .field('categoryId', product.categoryId)
        .field('stock', product.stock)
        .attach('image', file.buffer, file.originalname);
      expect(response.status).toBe(401);
    });

    it('should return status 401 if incorrect token is set (role CLIENT)', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', tokenClient)
        .field('name', product.name)
        .field('description', product.description)
        .field('price', product.price)
        .field('categoryId', product.categoryId)
        .field('stock', product.stock)
        .attach('image', file.buffer, file.originalname);
      expect(response.status).toBe(401);
    });
  });
  describe('PUT /products/:id', () => {
    it('should update a product', async () => {
      const updatedProduct = {
        name: 'Updated Product',
        price: 14.99,
        description: 'This product has been updated',
      };
      const response = await request(app)
        .put(`/api/products/${newProduct.id}`)
        .set('Authorization', tokenManager)
        .send(updatedProduct)
        .expect(200);
      expect(response.body.message).toEqual('product updated');
      expect(response.body.data.name).toBe(updatedProduct.name);
      expect(response.body.data.price).toBe(`${updatedProduct.price}`);
      expect(response.body.data.description).toBe(updatedProduct.description);
    });
    it('should return 401 if incorrect token is set (role CLIENT)', async () => {
      const updatedProduct = {
        name: 'Updated Product',
        price: 14.99,
        description: 'This product has been updated',
      };
      const response = await request(app)
        .put(`/api/products/${newProduct.id}`)
        .set('Authorization', tokenClient)
        .send(updatedProduct)
        .expect(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete a product', async () => {
      const response = await request(app)
        .delete(`/api/products/${newProduct.id}`)
        .set('Authorization', tokenManager)
        .expect(200);
      expect(response.body.message).toEqual('product deleted');
      expect(response.body.data.id).toEqual(newProduct.id);
    });
    it('should return 401 if incorrect token is set (role CLIENT)', async () => {
      const response = await request(app)
        .delete(`/api/products/${newProduct.id}`)
        .set('Authorization', tokenClient)
        .expect(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
