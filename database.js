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
    res = connection.query("select * from suppiler")
    return res
}

console.log("conneced to databse")

module.exports = { insert_products, get_groups, get_suppilers, insert_creditorProfile,insert_productGroup,insert_supplier,
    insert_retailer,
    
    

};
