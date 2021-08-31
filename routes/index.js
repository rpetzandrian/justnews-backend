const postRouter = require('./PostRouter');
const authRouter = require('./AuthRouter');
const categoryRouter = require('./CategoryRouter');
const userRouter = require('./UserRouter');
const commentRouter = require('./CommentRouter');
const notifRouter = require('./NotifRouter');
const pusherRouter = require('./Pusher');
const testingRouter = require('./testing')

const routes = (app, prefix, cors) => {
  // app.use(`${prefix}/paths`, pathRouter);
  app.use(`${prefix}/posts`, postRouter);
  app.use(`${prefix}/auth`, authRouter);
  app.use(`${prefix}/category`, categoryRouter);
  app.use(`${prefix}/users`, userRouter);
  app.use(`${prefix}/comments`, commentRouter);
  app.use(`${prefix}/notif`, notifRouter);
  app.use(`${prefix}/pusher`, pusherRouter);
  app.use(`/testing/middleware`, testingRouter);
}

module.exports = routes;