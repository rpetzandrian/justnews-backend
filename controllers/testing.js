module.exports = testing = {
  adminMiddleware: (req, res) => {
    res.status(200).send({
      message: 'This site is admin only',
      statusCode: 200
    });
  },
}