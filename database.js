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
    res = connection.query("select * from supplier")
    return res
}

get_creditors = () => {
    res = connection.query("select * from creditor_profile")
    return res
}

get_products = () => {
    res = connection.query("select * from products inner join price_details on products.id = price_details.product_id")
    return res
}

get_product_by_id = (id) => {
    res = connection.query("select * from products inner join price_details on products.id = price_details.product_id where id = ?", [id])
}
console.log("conneced to databse")

insert_order = (data) => {
    try {
        let d = new Date()
        let supplier_id = data.supplier_id, products = data.products

        let total_payable = 0
        let paid = 0
        let date = d.toISOString().split('T')[0] + ' '
            + d.toTimeString().split(' ')[0];
        let status = 0
        let sql = "select cost_price from price_details where product_id = ?"
        let res1, res2, res3
        let cost_prices = []

        for (let i = 0; i < products.length; i++) {
            res1 = connection.query(sql, [products[i].id])
            total_payable += res1[0].cost_price * products[i].quantity
            cost_prices.push(res1[0].cost_price)
            console.log(res1)
        }
        sql = "insert into order_details(supplier_id, date, status, total_payable, paid) values(?,?,?,?,?)"
        res2 = connection.query(sql, [supplier_id, date, status, total_payable, paid])
        console.log(res2)
        let order_id = res2.insertId
        sql = "insert into ordered_products (order_id, product_id, quantity, status, cost_per_unit) values(?,?,?,?,?)"
        for (let i = 0; i < products.length; i++) {
            res3 = connection.query(sql, [order_id, products[i].id, products[i].quantity, 0, cost_prices[i]])
            console.log(res3)
        }
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

get_order_details = () => {
    sql = "select o.id, supplier_id, s.name, date, status, total_payable, paid from order_details as o , supplier as s where o.supplier_id = s.id order by date desc"
    res = connection.query(sql)
    return res
}

update_order = (data) => {
    sql = "update order_details set status = ? , paid = ? where id = ?"
    try {
        let res = connection.query(sql, [data.status, data.paid, data.id])
        if (data.status == 1) {
            sql = "select order_id, product_id, cost_per_unit, quantity from ordered_products where order_id = ?"
            res1 = connection.query(sql, [data.id])
            for (let i = 0; i < res1.length; i++) {
                sql = "select product_id,quantity from current_inventory where product_id = ?"
                res2 = connection.query(sql, [res1[i].product_id])
                console.log(res2)
                if (res2.length > 0) {
                    console.log(res1[i].quantity + res2[0].quantity)
                    sql = "update current_inventory set quantity = ? where product_id = ?"
                    res3 = connection.query(sql, [res1[i].quantity + res2[0].quantity, res1[i].product_id])
                }
                else {
                    console.log("in2")
                    sql = "insert into current_inventory(product_id, quantity) values(?,?)"
                    res3 = connection.query(sql, [res1[i].product_id, res1[i].quantity])
                }

                sql = "insert into transactions (type, product_id, quantity, date, price_per_unit) values(1,?,?,?,?)"
                let d = new Date()
                let date = d.toISOString().split('T')[0] + ' '
                    + d.toTimeString().split(' ')[0];
                res3 = connection.query(sql, [res1[i].product_id, res1[i].quantity, date, res1[i].cost_per_unit])
            }
        }
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

credit_products = (data) => {
    try {
        let d = new Date()
        let creditor_id = data.creditor_id, products = data.products

        let total_payable = 0
        let paid = 0
        let date = d.toISOString().split('T')[0] + ' '
            + d.toTimeString().split(' ')[0];
        let status = 0
        let sql = "select selling_price from price_details where product_id = ?"
        let res1, res2, res3
        let selling_prices = []

        for (let i = 0; i < products.length; i++) {
            res1 = connection.query(sql, [products[i].id])
            total_payable += res1[0].selling_price * products[i].quantity
            selling_prices.push(res1[0].selling_price)
            console.log(res1)
        }
        //sql = "insert into order_details(supplier_id, date, status, total_payable, paid) values(?,?,?,?,?)"
        //res2 = connection.query(sql, [supplier_id, date, status, total_payable, paid])
        //console.log(res2)
        //let order_id = res2.insertId

        sql = "insert into credited_products (creditor_id, product_id,quantity, date, selling_price) values(?,?,?,?,?)"
        sql2 = "insert into transactions(type, product_id, quantity, date , price_per_unit) values(?,?,?,?,?)"
        sql3 = "update current_inventory set quantity = quantity - ? where product_id = ?"
        for (let i = 0; i < products.length; i++) {
            res3 = connection.query(sql, [creditor_id, products[i].id, products[i].quantity, date, selling_prices[i]])
            res4 = connection.query(sql2, [0, products[i].id, products[i].quantity, date, selling_prices[i]])
            res5 = connection.query(sql3, [products[i].quantity, products[i].id])
            console.log(res3)
        }

        sql = "update creditor_profile set total_amt_payable = ?  where id  = ?"
        connection.query(sql, [total_payable, creditor_id])
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

update_creditor_paid = (data) => {
    try {
        sql = "update creditor_profile set amt_paid = ? where id = ?"
        res = connection.query(sql, [data.paid, data.id])
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

quick_sell = (data) => {
    let d = new Date()
    let date = d.toISOString().split('T')[0] + ' '
        + d.toTimeString().split(' ')[0];
    try {
        let sql = "update current_inventory set quantity = quantity - ? where product_id = ?"
        let sql2 = "insert into transactions(type, product_id, quantity, date , price_per_unit) values(0,?,?,?,?)"
        let sql3 = "select selling_price from price_details where product_id = ?"
        let price_per_unit = connection.query(sql3, [data.product_id])[0].selling_price
        console.log(price_per_unit)
        res1 = connection.query(sql, [data.quantity, data.product_id])
        res2 = connection.query(sql2, [data.product_id, data.quantity, date, price_per_unit])
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}
module.exports = { quick_sell, update_creditor_paid, credit_products, get_creditors, update_order, get_order_details, insert_order, insert_products, get_groups, get_suppilers, get_products, get_product_by_id };