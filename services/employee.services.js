const db = require('../config/db')



module.exports.getAllEmployee = async() => {
    const [row] = await db.query("SELECT * FROM employee")
    return row;
}

module.exports.getEmployeeById = async(id) => {
    const [row] = await db.query("SELECT * FROM employee WHERE id = ?" , [id])
    return row;
}

module.exports.deleteEmployee = async(id) => {
    const [{affectedRows}] = await db.query("DELETE FROM employee WHERE id = ? " , [id])
    return affectedRows;
}

module.exports.addOrEditEmployee = async(obj, id = 0) => {
    const [[[{affectedRows}]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?) " , [id, obj.name, obj.employee_code, obj.salary])
    return affectedRows;
}