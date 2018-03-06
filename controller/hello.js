var router = require('koa-router')();
//const router = Router({ prefix: '/hello'})

router.get('/', async function(ctx, next) {
    ctx.state = {
        title: 'abc '
    };    
    ctx.response.body = `<h1>hello world!</h1>`;
})

router.get('/session', async function(ctx, next) { 
     // 读取session信息
    ctx.session.count = ctx.session.count + 1
    ctx.response.body = ctx.session;
})
router.get('/session/set', async function(ctx, next) { 
 ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.response.body = ctx.session;
})

const { getUsers,getUser } = require('../db/mysqlUser')
router.get('/users', async function(ctx, next) { 
  return ctx.response.body = await getUsers();
})
router.get('/user/:id', async function(ctx, next) { 
    var id = ctx.params.id;
  return ctx.response.body = await getUser(id);
})

const  empDAO = require('../db/mongoEmp')
router.get('/emp', async function(ctx, next) {
 let result = await empDAO.findAll();
    await ctx.render('list', {
        empList: result
    })
})

router.get('/:name', async function(ctx, next) {
    let name = ctx.params.name;
    ctx.state = {
        title: 'abc '
    };
    console.log(ctx.render.path);
    await ctx.render('index', { hello: `abc ${name}` });
})



module.exports = router;