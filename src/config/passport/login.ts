import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../models/user';

const strategy = new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username })

      if( !user ) { return done(null, false, { message: 'User not found.' }) }

      if( !user.validPassword(password) ) {
        return done(null, false, { message: 'Incorrect password.' })
      }

      return done(null, user)

    } catch (err) {

      return done(err)

    }

  }
)

export default strategy
