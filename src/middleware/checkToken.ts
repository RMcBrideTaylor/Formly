/*
export default async function(req, res, next) {
  // If the session has no token
  if(!req.token) {
    res.status(401).send({
      message: 'Access Denied.'
    })
  }

  // Check that the token exists, is valid, and has an expiry date.
  const token = await Cache.findOne({ key: 'token', value: req.token })

  // If the token does not exist
  if(!token) {
    res.status(401).send({
      message: 'Invalid token.'
    })
  }

  // If the token has expired
  if(token.expires < Date(Date.now())) {
    res.status(401).send({
      message: 'Expired token.'
    })
  }


  next()
}
*/
