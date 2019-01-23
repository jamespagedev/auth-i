module.exports = (req, res, next) => {
  // if a session exists AND the user is logged in... next
  // else bounce the user
  if (req.session && req.session.userId) {
    next()
  } else {
    res.status(401).json({ message: 'You shall not pass!' })
  }
}