import { db } from '../utils/db/db.server';
import boom from '@hapi/boom';

class CartService {
  async create(data) {
    const numericUserId = parseInt(data.sub);
    const newCart = await db.cart.create({
      data: { userId: numericUserId, total: 0 },
    });

    return newCart;
  }

  async addProduct(data, user) {
    let createCart;
    const { productId, quantity } = data;
    const numericProductId = parseInt(productId);
    const numericQuantity = parseInt(quantity);

    //Find product's price
    const product = await db.product.findUnique({
      where: { id: numericProductId },
      select: { price: true, stock: true, isEnable: true },
    });
    //Find user's cart id
    const cart = await db.cart.findUnique({ where: { userId: user.sub } });
    //If cart doesn't exists, create it
    if (!cart) createCart = await this.create({ userId: user.sub });
    //Check if product is enable
    if (!product.isEnable) throw boom.conflict('product disable');
    //Check if it has enough stock
    if (numericQuantity > product.stock)
      throw boom.conflict('insufficient stocks');

    const numericCartId = parseInt(cart?.id || createCart.id);
    const total = numericQuantity * parseFloat(product.price.toString());
    const newProductInCart = await db.productInCart.create({
      data: {
        productId: numericProductId,
        cartId: numericCartId,
        quantity: numericQuantity,
        price: total,
      },
    });

    return newProductInCart;
  }
}

export { CartService };
