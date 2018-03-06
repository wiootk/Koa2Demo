const mongodb = require('./mongoUtil');
const Schema = mongodb.mongoose.Schema;
//  schema 数据库模型骨架，不具备操作数据库能力
var dept = new Schema({
    id: String, //部门编号
    name: String //名称
});
var emp = new Schema({
    id: Number, //工号
    name: String, //姓名
    age: { type: Number, default: 0 }, //年龄
    // dep_id: String //部门
    dep: {
        type: Schema.Types.ObjectId,
        ref: 'dept'
    }
});

// 添加实例方法
emp.methods.printInfo = function() {
        let greeting = this.name;
        console.log("Testing methods defined in schema:" + greeting);
    }
    // 添加静态方法,在Model层就能使用
emp.statics.findbyId = function(id, callback) {
    return this.model('employee').find({ id: id }, callback);
}

// model 由Schema构造生成的模型,类似于管理数据库属性、行为的类。
var employee = mongodb.mongoose.model("employee", emp);
var department = mongodb.mongoose.model('department', dept);


//Entity —— 由Model创建的实体，能影响数据库操作
var empEntity = new employee({
    id: 1,
    name: '姓名'
});
console.log(empEntity.name, empEntity.id);

empEntity.save(function(err, doc) {
    if (err) {
        console.log("error :" + err);
    } else {
        console.log(doc);
    }
})
var empDAO = function() {};
empDAO.prototype.findAll = async function(callback) {

    console.log(await employee.find({}));
    return await employee.find({}, callback)
        // .populate({ path: 'dep', select: { id: 1 } }).exec();    
}
module.exports = new empDAO();