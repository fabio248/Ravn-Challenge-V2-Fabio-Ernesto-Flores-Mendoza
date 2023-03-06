import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../../config/config';

// Define options for JWT strategy
const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretJWT,
};

// Define JWT strategy with given options
const JwtStrategy = new Strategy(option, (payload, done) => {
  return done(null, payload);
});

export { JwtStrategy };
