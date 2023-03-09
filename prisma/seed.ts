import { Role } from '@prisma/client';
import { db } from '../src/utils/db/db.server';

async function main() {
  //Categories
  await db.category.createMany({
    data: [
      {
        name: 'Food cat',
        description:
          'Our cat food category offers a range of premium quality and nutritious options for your furry feline friend. Specially formulated to provide a balanced and complete diet, our cat food range includes a variety of flavors and textures to suit all tastes and preferences. Our food is made from high-quality ingredients and is free from artificial preservatives and additives, ensuring that your cat receives only the best nutrition. Whether your cat prefers dry or wet food, our selection of products provides a delicious and healthy meal option for your beloved pet. Shop now to give your cat the food they deserve.',
      },
      {
        name: 'Toys',
        description:
          'A wide selection of toys for your furry feline friend. From interactive toys to plush toys and scratching posts, we have everything your cat needs to stay happy and active. Our toys are made with high-quality materials and designed to provide endless hours of entertainment for cats of all ages and sizes. Shop now and give your cat the gift of playtime!',
      },
    ],
  });
  //Users
  const user = await db.user.createMany({
    data: [
      {
        name: 'Fabio',
        lastName: 'Flores',
        email: 'dawdawddawd@gmail.com',
        password: 'password',
      },
      {
        name: 'Kevin',
        lastName: 'Velazques',
        email: 'keviwaddawdaw@gmail.com',
        password: 'password',
        role: Role.MANAGER,
      },
    ],
  });
  console.log({ user });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
