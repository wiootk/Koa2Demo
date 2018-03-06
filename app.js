const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const koaLogger = require('koa-logger')
const convert = require('koa-convert')
// const router = new Router()
app.use(convert(koaLogger()))
const views = require('koa-views');
app.use(views(__dirname + '/views', {  extension: 'html',map: { html: 'ejs' }}));

const koaStatic = require('koa-static')
const path= require("path")
app.use(koaStatic(
  path.join( __dirname,  './static')
))


const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
// 配置存储session信息的mysql
let store = new MysqlSession({
  user: 'root',
  password: 'root',
  database: 'demo3',
  host: '127.0.0.1'
})

// 存放sessionId的cookie配置
let cookie = {
  maxAge: '', // cookie有效时长
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: '',  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: ''
}
// 使用session中间件
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))





// app.use(ctx => {
//   ctx.body = `网址路径为:${ctx.request.url}`
// })

// app.use(bodyParser())
// router.get('/', ctx => {
//   ctx.body = `这是主页`
// })
// router.get('/user', ctx => {
//   ctx.body = `这是user页`
// })

// router.get('/post', ctx => {
//   ctx.body = ctx.request.body
// })

// router.get('/async', async ctx => {
//   const sleep = async (ms) => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(true)
//       }, ms)
//     })
//   }
//   await sleep(1000)
//   ctx.body = `这是异步处理页`
// })

// app.use(router.routes())
//   .use(router.allowedMethods())

// app.listen(3000)
// console.log(`koa2 已启动 , 端口 : 3000`)


const router = require('./router')

app.use(bodyParser())
app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, (err) => { if (err) { console.error(err); } else { console.log(`koa2 已启动 , 端口 : 3000`); } });

module.exports = app;