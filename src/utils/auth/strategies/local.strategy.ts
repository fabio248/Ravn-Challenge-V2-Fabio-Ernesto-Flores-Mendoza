import { Strategy } from 'passport-local';
import { AuthService } from '../../../services/auth.service';

const authService = new AuthService();
/**
Local Strategy using email as usernameField for authentication
@param {string} username - Email of the user trying to authenticate
@param {string} password - Password of the user trying to authenticate
@param {Function} done - Passport done function to return the authenticated user or error
*/
const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
  },
  async (username: string, password: string, done) => {
    try {
      const user = await authService.getUser(username, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export { LocalStrategy };
