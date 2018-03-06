// const Router = require('koa-router')
// const router = new Router()
// const user = require('./controller/user')
// const hello = require('./controller/hello');
// router.post('/user/login', user.login)
// router.get('/user/profile', user.profile)
// router.use('/hello', hello.routes(), hello.allowedMethods());
// module.exports = router


const Router = require('koa-router')
const router = new Router()
const user = require('./controller/user')
    // const hello = require('./controller/hello');
router.post('/user/login', user.login)
router.get('/user/profile', user.profile)

const articles = require('./middleware/articles')
router.get('/:id/edit', articles.checkLogin, articles.edit)
    // router.use('/hello', hello.routes(), hello.allowedMethods());
router.get('/cookie', async function(ctx, next) { 
 ctx.cookies.set("demo", "demoValue", {
      name: 'abc',
      expires: '20',
      secure: false,
      httpOnly: true

    }) 
 ctx.response.body = ctx.cookies.get("abc");
})

const fs = require('fs');
let addControllers = (router, dir) => {
    dir = dir || 'controller';
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        const model = require(__dirname + '/' + dir + '/' + f);
        if (model.constructor == Router) {
        	// constructor 更加精确地指向对象所属的类，而对 instanceof 而言，即使是父类也会返回true
            const modelStr = f.replace(/.js/, '');
            router.use(`/${modelStr}`, model.routes(), model.allowedMethods());
        }
    })
}
addControllers(router);

module.exports = router