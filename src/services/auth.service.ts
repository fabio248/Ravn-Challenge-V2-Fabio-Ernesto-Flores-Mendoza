import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { UserService } from './users.service';

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
  //Creates JWT that contains a payload with the user's id and role.
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.secretJWT);
    return { user, token };
  }
}

export { AuthService };
