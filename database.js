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
insert_supplier = (data) => {
    let sql =
      "insert into supplier(name, address, phone_no ,account_no) values (?,?,?,?)";
    try {
      res = connection.query(sql, [
        data.name,
        data.address,
        data.phone_no,
        data.account_no,
      ]);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  insert_retailer = (data) => {
    let sql = "insert into retailer(username, password, name ) values (?,?,?)";
    try {
      res = connection.query(sql, [data.username, data.password, data.name]);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  insert_productGroup = (data) => {
    let sql =
      "insert into product_group(g_name, description, total_items) values (?,?,?)";
    try {
      res = connection.query(sql, [
        data.g_name,
        data.description,
        data.total_items,
      ]);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  insert_creditorProfile = (data) => {
    console.log("creds");
    console.log(data);
    let sql =
      "insert into creditor_profile(name, address, phone ,total_amt_payable,amt_paid) values (?,?,?,?,?)";
    try {
      res = connection.query(sql, [
        data.name,
        data.address,
        data.phone,
        data.total_amt_payable,
        data.amt_paid,
      ]);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
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
get_transactions = (data) => {
    console.log(data.from_date);
    console.log(data.to_date);
    let sql = "select * from transactions where p_date between  ? and ?";
    console.log("sql query");
    console.log(sql);
    try {
      res = connection.query(sql,[data.from_date, data.to_date]);
      console.log(res)
      return res;
    } catch (err) {
      console.log("Could't fetch");
      console.log(err);
      return null;
    }
    
}




del_creditor = (data) =>{
  console.log(data)
  console.log("Inside del db");
   let sql = "DELETE FROM  creditor_profile where id = ?";
   try{
     res = connection.query(sql,[data.id]);
     console.log(res)
     return true;

   }catch(err){
     console.log(err)
     return false;
   }
}
get_creditors_id = (data) =>{
  res = connection.query("select * from creditor_profile where id = ?",[data.id]);
  return res

}
update_creditorProfile = (data) => {

  let sql =
    "update creditor_profile set name = ?, address = ? , phone = ? ,total_amt_payable= ? , amt_paid= ? where id = ?";
    try {
      res = connection.query(sql, [
        data.name,
        data.address,
        data.phone,
        data.total_amt_payable,
        data.amt_paid,
        data.id,
      ]);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
};

update_supplier = (data) =>{
  let sql = "update supplier set name = ?, address = ? , phone_no = ? ,account_no = ? where id = ?";
  try {
    res = connection.query(sql, [
      data.name,
      data.address,
      data.phone_no,
      data.account_no,
     
      data.id,
    ]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//changes in my get_products to get_product
get_product = () =>{
  res = connection.query("SELECT DISTINCT o.id , o.name,o.group_id,o.description,o.measuring_unit, c.g_name,c.description as gdes,c.total_items , p.cost_price , p.selling_price, p.mrp , p.discount FROM products as O JOIN product_group as c ON O.group_id = c.id Join price_details p WHERE o.id = p.product_id");
  return res;

}
get_currentInventory = () =>{
  res = connection.query("SELECT ci.product_id,  s.name , s.group_id , s.description , s.measuring_unit , pd.cost_price , pd.selling_price , pd.mrp, pd.discount , pg.g_name , pg.description  as gdes , pg.total_items,   ci.quantity from  current_inventory as ci JOIN products as s on s.id = ci.product_id JOIN  price_details as pd on pd.product_id = ci.product_id JOIN product_group as pg WHERE pg.id = s.group_id");
  return res;
}
//change in myfunction get product_by_id
get_product_byId = (data) =>{
  res = connection.query("select * from products where id = ?",[data.id]);
  return res;
}
get_supplier_by_id = (data) =>{
  res = connection.query("select * from supplier where id = ?",[data.id]);
  return res;
}
del_product = (data) =>{
  console.log(data)
  console.log("Inside del product");
   let sql = "DELETE FROM  products where id = ?";
   try{
     res = connection.query(sql,[data.id]);
     console.log(res)
     return true;

   }catch(err){
     console.log(err)
     return false;
   }
}
get_retailer = (data) =>{
  console.log("inside get retailer");
  console.log(data)
  let sql = "select * from retailer where username = ? and password = ?";
  try{
    res = connection.query(sql,[data.username,data.password])
    console.log("running query");
    console.log(res.length)
    if(res.length == 0){
    return false;
    }
    return true;
  }catch(err){
    console.log(err)
    return false;
  }
}
del_supplier= (data) =>{
  console.log(data)
  console.log("Inside del supplier");
   let sql = "DELETE FROM  supplier where id = ?";
   try{
     res = connection.query(sql,[data.id]);
     console.log(res)
     return true;

   }catch(err){
     console.log(err)
     return false;
   }
}
update_product = (data) => {
//Full texts	id name group_id description measuring_unit 
console.log("Update")
console.log(data)
console.log("Update id ")
console.log(data.id)
  let sql =
    "update products set name = ?, group_id = ? , description = ? ,measuring_unit = ?  where id = ?";
  let sql2 = " update  price_details set   cost_price = ?,  selling_price=? , mrp=? , discount = ?  where product_id = ?";
    try {
      res = connection.query(sql, [
        data.name,
        data.group_id,
        data.description,
        data.measuring_unit,
        data.id,
      ]);
      console.log(res)
      console.log("uadte res id")
      console.log(res.updateId)
      res2 = connection.query(sql2, [
       data.cost_price, data.selling_price, data.mrp, data.discount, data.id,
      ]);
      console.log(res2)
      
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
};
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
    
module.exports = { quick_sell, update_creditor_paid, credit_products, get_creditors, update_order, get_order_details, insert_order, insert_products, get_groups, get_suppilers, get_products, get_product_by_id,
  insert_products, get_groups, get_suppilers, insert_creditorProfile,insert_productGroup,insert_supplier,
  insert_retailer,get_transactions, get_creditors,del_creditor,get_creditors_id , update_creditorProfile ,
  update_product, del_product, get_product_by_id ,get_products , del_supplier,update_supplier,get_supplier_by_id,get_retailer,
  get_currentInventory , get_product,get_product_byId
}