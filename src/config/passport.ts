import passport from 'passport';
import loginStrategy from './passport/login';
import registerStrategy from './passport/register';
import verifyStrategy from './passport/verify';

passport.use('login', loginStrategy);
passport.use('register', registerStrategy);
passport.use('verify', verifyStrategy);

export default passport
