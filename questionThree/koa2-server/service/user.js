const allSqlAction = require("../utils/mysql")
async function checkUser(username, password) {
    let sql = `select * from elm_user where elm_userName = "${username}" and elm_userPassword = "${password}"`
    return allSqlAction.allSqlAction(sql).then(res => {
        console.log(res, '--登陆用户检查')
        if (res.length == 1 && res[0].elm_userName === username && res[0].elm_userPassword === password) {
            return { ok: true, "status": 200  }
        } else {
            return { ok: false, "status": 201, msg: "登陆失败" }
        }
    })
}
async function findUser(username, password) {
    let sql = `select * from elm_user where elm_userName = "${username}"`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length == 0) {
            return registerUser(username, password)
        } else {
            return { ok: false, "status": 500, msg: "用户名已存在" }
        }
    })
}
async function registerUser(username, password) {
    if(username.length < 5 ||  username.length > 20) {
        return { ok: false, "status": 401, msg: "用户名不规范，长度应在 5 - 20 之间" }
    }
    let sql = `insert into elm_user (elm_userName,elm_userPassword) values ('${username}','${password}')`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return { ok: true, "status": 200 }
        } else {
            return { ok: false, "status": 402, msg: "注册失败"}
        }
    })
}
module.exports = {
    checkUser,
    findUser,
    registerUser
}