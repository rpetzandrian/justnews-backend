module.exports = authMiddleware = (req, res, next) => {
  const provider = req.body.provider;
  if (provider === 'google') {
    req.body = {
      email: req.body.email || undefined,
      name: req.body.name || undefined,
      username: req.body.givenName || undefined,
      photo: req.body.imageUrl || undefined,
      google_id: req.body.googleId || undefined,
    }
    req.query.provider = provider
    next()
  } else if (provider === 'facebook') {
    req.body = {
      email: req.body.email || undefined,
      name: req.body.name || undefined,
      username: req.body.name || undefined,
      photo: req.body.imageUrl || undefined,
      fb_id: req.body.userID || undefined,
    }
    req.query.provider = provider
    next()
  } else {
    next()
  }
}