const db = require('../config/db')



module.exports.getAllUsers = async() => {
    const [row] = await db.query("SELECT * FROM users")
    return row;
}

module.exports.getUserById = async(id) => {
    const [row] = await db.query("SELECT * FROM users WHERE id = ?" , [id])
    return row;
}

module.exports.deleteUSer = async(id) => {
    const [{affectedRows}] = await db.query("DELETE FROM users WHERE id = ? " , [id])
    return affectedRows;
}

module.exports.addOrEditUser = async(obj, id = 0) => {
    const [[[{affectedRows}]]] = await db.query("CALL usp_user_add_or_edit(?,?,?,?,?,?,?) "  ,
           [id, obj.name, obj.email, obj.password, obj.contacts, obj.age, obj.is_active])
    return affectedRows;
}