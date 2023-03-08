import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../../config/config';
// Define options for JWT strategy
var option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretJWT,
};
// Define JWT strategy with given options
var JwtStrategy = new Strategy(option, function (payload, done) {
    return done(null, payload);
});
export { JwtStrategy };
//# sourceMappingURL=jwt.strategy.js.map