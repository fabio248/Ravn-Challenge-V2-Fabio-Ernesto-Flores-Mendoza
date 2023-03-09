import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { UserService } from './users.service';
import { dataUser, selectedDataUser } from '../utils/types/user.types';
import { db } from '../utils/db/db.server';

const userService = new UserService();
class AuthService {
  //Finds user by emails
  async getUser(email, password) {
    const user = await userService.findUserByEmail(email);
    if (!user) throw boom.unauthorized();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized();
    delete user.password;
    return user;
  }
  //Creates a new user.
  async createUser(data: dataUser) {
    const { name, lastName, email, password, role } = data;
    const hashPassword = await bcrypt.hash(password, 10);

    data.password = hashPassword;
    const createUser = await db.user.create({
      data: { name, lastName, email, password: hashPassword, role },
      select: selectedDataUser,
    });
    return createUser;
  }
  //Creates JWT that contains a payload with the user's id and role.
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.secretJWT, { expiresIn: '24h' });
    return { user, token };
  }
}

export { AuthService };
