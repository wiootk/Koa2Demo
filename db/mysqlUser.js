const { query } = require('./mysqlUtil')
async function getUsers( ) {
  let sql = 'SELECT * FROM user'
  return await query( sql )
}
async function getUser( userId) {
 let sql = 'select * from user where id = ?'
  return await query( sql,userId )
}
module.exports = { getUsers,getUser }