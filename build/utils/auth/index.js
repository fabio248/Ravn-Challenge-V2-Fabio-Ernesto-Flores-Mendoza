import passport from 'passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
//Use auntentification strategies
passport.use(LocalStrategy);
passport.use(JwtStrategy);
//# sourceMappingURL=index.js.map