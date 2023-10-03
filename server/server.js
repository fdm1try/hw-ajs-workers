const Koa = require('koa');
const slow = require('koa-slow');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const getAllNews = require('./model');

const app = new Koa();
const router = new Router();
const corsOptions = {};
const [corsOrigin] = process.argv.slice(2);
if (corsOrigin) corsOptions.origin = corsOrigin;

router.get('/news/all', (ctx) => {
  const posts = getAllNews();
  ctx.response.body = { status: 'ok', timestamp: Date.now(), posts };
});

app.use(cors(corsOptions))
  .use(slow({ url: /\/news\/all$/, delay: 3000 }))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8088);
