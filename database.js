var mysql = require('sync-mysql');
var connection = new mysql({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

insert_products = (data) => {
    let sql = "insert into products(name, description, group_id ,measuring_unit) values (?,?,?,?)";
    let sql2 = "insert into price_details(product_id,cost_price,selling_price,mrp,discount) values(?,?,?,?,?)"
    try {
        res = connection.query(sql, [data.name, data.description, data.group_id, data.measuring_unit])
        //console.log(res)
        res1 = connection.query(sql2, [res.insertId, data.cost_price, data.selling_price, data.mrp, data.discount])
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

get_suppilers = () => {
    res = connection.query("select * from suppiler")
    return res
}

console.log("conneced to databse")

module.exports = { insert_products, get_groups, get_suppilers };