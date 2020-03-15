import passport from 'passport';
import loginStrategy from './passport/login';
import tokenStrategy from './passport/token'

passport.use('login', loginStrategy);
passport.use('token', tokenStrategy)

export default passport
