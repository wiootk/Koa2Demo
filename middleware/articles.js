module.exports = {
async  edit(ctx, next) {
  const locals = {
    title: '编辑',
    nav: 'article'
  }
  await ctx.render('articles/edit', locals)
},
async  checkLogin(ctx, next) {
  if(!ctx.state.isUserSignIn){
    ctx.status = 302
    ctx.redirect('/')
    return
  }
  await next()
}
}
