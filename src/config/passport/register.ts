import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../models/user';

const strategy = new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.create({ username, password })
      return done(null, user)

    } catch (err) {
      return done(err)

    }

  }
)


export default strategy;
