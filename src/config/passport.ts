import passport from 'passport';
import loginStrategy from './passport/login';
import registerStrategy from './passport/register';

passport.use('login', loginStrategy);
passport.use('register', registerStrategy);

export default passport
