import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Cache } from '../../models/cache'
import { User } from '../../models/user'

const strategy = new BearerStrategy(
  async (token, done) => {
    try {
      const cache = await Cache.findOne({ key: 'token', value: token }, { relations: ["account", "account.users"] })

      // If token does not exist
      if(!cache) { return done(null, false, 'Token not found.') }

      // If token is expired
      const CURRENT_DATE = new Date(Date.now())
      if(cache.expires < CURRENT_DATE) { return done(null, false, 'Expired Token.') }

      // Get the most recent user associated with the account
      const user = await User.findOne({ account: cache.account }, { relations: ["account"] })

      if(!user) { return done(null, false, 'Invalid token.') }

      return done(null, user)

    } catch (err) {
      return done(err)

    }
  }
)

export default strategy
