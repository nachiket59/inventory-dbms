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
get_creditors = () =>{
  res = connection.query("select * from creditor_profile");
  return res
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

get_products = () =>{
  res = connection.query("SELECT DISTINCT o.id , o.name,o.group_id,o.description,o.measuring_unit, c.g_name,c.description as gdes,c.total_items , p.cost_price , p.selling_price, p.mrp , p.discount FROM products as O JOIN product_group as c ON O.group_id = c.id Join price_details p WHERE o.id = p.product_id");
  return res;

}
get_currentInventory = () =>{
  res = connection.query("SELECT ci.product_id,  s.name , s.group_id , s.description , s.measuring_unit , pd.cost_price , pd.selling_price , pd.mrp, pd.discount , pg.g_name , pg.description  as gdes , pg.total_items,   ci.quantity from  current_inventory as ci JOIN products as s on s.id = ci.product_id JOIN  price_details as pd on pd.product_id = ci.product_id JOIN product_group as pg WHERE pg.id = s.group_id");
  return res;
}
get_product_by_id = (data) =>{
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



module.exports = { insert_products, get_groups, get_suppilers, insert_creditorProfile,insert_productGroup,insert_supplier,
    insert_retailer,get_transactions, get_creditors,del_creditor,get_creditors_id , update_creditorProfile ,
    update_product, del_product, get_product_by_id ,get_products , del_supplier,update_supplier,get_supplier_by_id,get_retailer,
    get_currentInventory ,
};
