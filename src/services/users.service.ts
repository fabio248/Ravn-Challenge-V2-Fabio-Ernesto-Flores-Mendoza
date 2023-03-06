import bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import { db } from '../utils/db/db.server';
import { dataUser, selectedDataUser } from '../utils/types/user.types';

class UserService {
  constructor() {}

  //Finds all users.
  async findAll() {
    const users = db.user.findMany({
      select: selectedDataUser,
    });
    return users;
  }
  //Finds a user by id.
  async findOne(id: number) {
    const foundUser = await db.user.findUnique({
      where: {
        id,
      },
      select: selectedDataUser,
    });
    console.log(foundUser);
    if (!foundUser) throw boom.notFound('user not found');
    return foundUser;
  }
  //Finds a user by email.
  async findUserByEmail(email: string) {
    const foundUser = await db.user.findUnique({ where: { email } });
    return foundUser;
  }

  //Updates a user by id.
  async update(id: number, changes: dataUser) {
    const updateUser = await db.user.update({
      where: { id },
      data: changes,
      select: selectedDataUser,
    });
    if (!updateUser) throw boom.notFound('user not found');
    return updateUser;
  }

  async delete(id: number) {
    await this.findOne(id);
    const deleteUser = await db.user.delete({
      where: { id },
      select: selectedDataUser,
    });

    return deleteUser;
  }
}

export { UserService };
