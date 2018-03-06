var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/demo2');
mongoose.connection.on('error', function(error) {
    console.log('数据库连接失败：' + error);
});
mongoose.connection.on('open', function() {
    console.log('——数据库连接成功！——');
});
exports.mongoose = mongoose;