var mysql = require('sync-mysql');
var connection = new mysql({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

insert_products = (data) => {
    let sql = "insert into products(name, description, group_id ,measuring_unit) values (?,?,?,?)";
    try {
        res = connection.query(sql, [data.name, data.description, data.group_id, data.measuring_unit])
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

get_groups = () => {
    res = connection.query("select * from product_group")
    return res
}


console.log("conneced to databse")

module.exports = { insert_products, get_groups };