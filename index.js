const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./database")
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));
const  moment = require("moment");
app.locals.moment = moment;
app.use(express.static(path.join(__dirname,"public")));
app.use( express.static( "images" ) );

var order_session = null
var credit_session = null
app.get("/", (req, res) => {
    res.render("index")
})


app.get("/index", (req, res) => {
  res.render("index")
})
app.get("/view_creditors", (req, res) => {
  creds = db.get_creditors()
  console.log(creds)
  res.render("view_creditors",{creditors:creds})
})

app.get("/view_currentInvent", (req, res) => {
  invt = db.get_currentInventory()
  console.log(invt)
  res.render("view_currentInvent",{current:invt})
})
app.get("/view_product", (req, res) => {
  prods = db.get_product()
  console.log("getting products")
  console.log(prods)
  res.render("view_product",{product:prods,del:null,update:null})
})


app.get("/view_supplier", (req, res) => {
  sup = db.get_suppilers()
  console.log("getting supplier")
  console.log(sup)
  res.render("view_supplier",{suppliers:sup,del:null,update:null})
})
app.get("/insert_product", (req, res) => {
    grp = db.get_groups()
    console.log(grp)
    res.render("insert_product", { groups: grp, inserted: null })
})
app.get("/insert_creditorProfile", (req, res) => {

    res.render("insert_creditorProfile", {inserted: null});
  });
  app.get("/insert_supplier", (req, res) => {
    res.render("insert_supplier", {inserted: null});
  });
  app.get("/insert_retailer", (req, res) => {
    res.render("insert_retailer", {inserted: null});
  });
  
  app.get("/insert_productGroup", (req, res) => {
  
    res.render("insert_productGroup", {inserted: null});
  });

  app.get("/view_transactions", (req, res) => {
   // trans = db.get_transactions()
    //console.log(trans)
  
    res.render("view_trans", {transaction: null} );
  });

  app.post("/transaction_all",(req,res) =>{
    trans = db.get_transactions(req.body)
    if(trans){
      res.render("view_transactions",{transaction:trans})
    }
    else{
      console.log(trans)
      console.log("No data found")
      res.render("view_transactions",{transaction:null})
    }

  })
app.post("/insert_product", (req, res) => {
    s = db.insert_products(req.body)
    if (s) {
        res.render("insert_product", { groups: grp, inserted: true })
    }
    else {
        res.render("insert_product", { groups: grp, inserted: false })
    }
    console.log(s)
})

app.post("/insert_creditorProfile", (req, res) => {

    console.log(req.body)
 
    s = db.insert_creditorProfile(req.body);
    if (s) {
        res.render("insert_creditorProfile", { inserted: true })
    }
    else {
        res.render("insert_creditorProfile", {inserted: false })
    }
    console.log(s);
  });


  app.post("/creditors_update", (req, res) => {

    console.log(req.body)
 
    s = db.update_creditorProfile(req.body);
    if (s) {
      creds = db.get_creditors()
        res.render("view_creditors", { creditors: creds })
    }
    else {
        res.render("view_creditors", {creditors: null })
    }
    console.log(s);
    
  });

  app.post("/product_update", (req, res) => {

    console.log(req.body)
 
    s = db.update_product(req.body);
    if (s) {

      prods = db.get_product();
  res.render("view_product",{product: prods,del:null,update:true});
    
    }
    else {
      prods = db.get_product();
      res.render("view_product",{product: prods,del:null,update:false});
    }
    console.log(s);
    
  });
  app.post("/supplier_update",(req,res) => {
    console.log(req.body)
    s = db.update_supplier(req.body)
    sup = db.get_suppilers()
  console.log("getting supplier")
  console.log(sup)
  if(s){
    res.render("view_supplier",{suppliers:sup,del:null,update:true})
  }
  else{
  res.render("view_supplier",{suppliers:sup,del:null,update:false})
  }

  });
  
  app.post("/insert_supplier", (req, res) => {
    console.log(req.body);
    s = db.insert_supplier(req.body);
    if (s) {
        res.render("insert_supplier", { inserted: true })
    }
    else {
        res.render("insert_supplier", { inserted: false })
    }
    console.log(s);
  });
  
  app.post("/insert_retailer", (req, res) => {
    console.log(req.body);
    s = db.insert_retailer(req.body);
    if (s) {
        res.render("login",{log : null})
    }
    else {
        res.render("login",{log : null})
    }
    console.log(s);
  });

  app.post("/insert_productGroup", (req, res) => {
    console.log(req.body);
    s = db.insert_productGroup(req.body);
    if (s) {
        res.render("insert_productGroup", { inserted: true })
    }
    else {
        res.render("insert_productGroup", { inserted: false })
    }
    console.log(s);
  });  
  app.post("/login_retailer",(req, res) =>{
    console.log(req.body)
    s = db.get_retailer(req.body);
    if(s){
      res.render("index")
    }
    else{
      res.render("login",{log:false})
    }

  })
app.get("/place_order1", (req, res) => {
    s = db.get_suppilers()
    //p = db.get_products()
    res.render("place_order1", { suppliers: s })
})
app.get("/place_order2/:id", (req, res) => {
    let sup_id = req.params.id
    order_session = { supplier_id: sup_id }
    p = db.get_products()
    res.render("place_order2", { supplier_id: sup_id, products: p })
})

app.post("/place_order3", (req, res) => {
    console.log(JSON.parse(req.body.products))
    order_session.products = JSON.parse(req.body.products)
    res.json(order_session)
})

app.get("/place_order_final", (req, res) => {
    console.log(order_session)
    let r = db.insert_order(order_session)
    res.render("confirmed_order", { placed: r })
})

app.get("/order_status", (req, res) => {
    od = db.get_order_details()
    res.render("order_status", { order_details: od })
})

app.post("/update_order", (req, res) => {
    console.log(req.body)
    u = db.update_order(req.body)
    if (u) {
        res.json({ done: true })
    }
    else {
        res.json({ done: false })
    }
})

app.get("/credit_products1", (req, res) => {
    c = db.get_creditors()
    //p = db.get_products()
    res.render("credit_products1", { creditors: c })
})

app.get("/credit_products2/:id", (req, res) => {
    let cred_id = req.params.id
    credit_session = { creditor_id: cred_id }
    p = db.get_products()
    res.render("credit_products2", { creditor_id: cred_id, products: p })
})
app.post("/credit_products3", (req, res) => {
    console.log(JSON.parse(req.body.products))
    credit_session.products = JSON.parse(req.body.products)
    res.json(credit_session)
})

app.get("/del_creditor", (req, res) => {
  console.log("inside del 1app");
  console.log(req.query);
  console.log("inside de00l app");
  console.log(req.query.id);

  console.log(req.body);
  s = db.del_creditor(req.query);
  if(s){
    creds = db.get_creditors();
  res.render("view_creditors",{creditors:creds});
}
else{
  res.render("view_creditors",{creditors:null});
}

})

app.get("/del_product", (req, res) => {
  console.log("inside del product");
  console.log(req.query);
  console.log("inside del product");
  console.log(req.query.id);

  console.log(req.body);
  s = db.del_product(req.query);
  if(s){
    prods = db.get_product();
  res.render("view_product",{product: prods,del:true , update:null});
}
else{
  prods = db.get_product();
  res.render("view_product",{product:prods,del:false,update:null});
}

});

app.get("/del_supplier", (req, res) => {
  console.log("inside del product");
  console.log(req.query);
  console.log("inside del product");
  console.log(req.query.id);

  console.log(req.body);
  s = db.del_supplier(req.query);
  sup = db.get_suppilers()
  console.log("getting supplier")
  console.log(sup)
  if(s){
    res.render("view_supplier",{suppliers:sup,del:true,update:null})
}
else{
  res.render("view_supplier",{suppliers:sup,del:false,update:null})
}

});

app.get("/update_creditor",(req,res) =>{
  console.log(req.query);
  creds = db.get_creditors_id(req.query)
  console.log(creds)
  console.log("id form update ")
  if(creds){
    res.render("update_CreditorProfile",{creditors:creds});
  }else{
    res.render("update_CreditorProfile",{creditors:null});
  }


} )

app.get("/login",(req,res) =>{
  res.render("login")
})
app.get("/update_supplier",(req,res)=>{
  console.log(req.query);
  sup = db.get_supplier_by_id(req.query)
  console.log(sup)
  console.log("id form update ")
  if(sup){
    res.render("update_Supplier",{suppliers:sup});
  }else{
    res.render("update_Supplier",{suppliers:null});
  }

}
)
app.get("/update_product",(req,res) =>{
  console.log(req.query);
   prods= db.get_product_byId(req.query)
  console.log(prods)
  console.log(" product id form update ")
  grp = db.get_groups()
    console.log(grp)
  if(prods){
    res.render("update_Product",{product:prods,groups:grp });
  }else{
    res.render("update_Product",{product:null,groups:null });
  }


} )


app.post("/place_order3", (req, res) => {
    console.log(JSON.parse(req.body.products))
    order_session.products = JSON.parse(req.body.products)
    res.json(order_session)
})

app.get("/place_order_final", (req, res) => {
    console.log(order_session)
    let r = db.insert_order(order_session)
    res.render("confirmed_order", { placed: r })
})

app.get("/order_status", (req, res) => {
    od = db.get_order_details()
    res.render("order_status", { order_details: od })
})

app.post("/update_order", (req, res) => {
    console.log(req.body)
    u = db.update_order(req.body)
    if (u) {
        res.json({ done: true })
    }
    else {
        res.json({ done: false })
    }
})

app.get("/credit_products1", (req, res) => {
    c = db.get_creditors()
    //p = db.get_products()
    res.render("credit_products1", { creditors: c })
})

app.get("/credit_products2/:id", (req, res) => {
    let cred_id = req.params.id
    credit_session = { creditor_id: cred_id }
    p = db.get_products()
    res.render("credit_products2", { creditor_id: cred_id, products: p })
})
app.post("/credit_products3", (req, res) => {
    console.log(JSON.parse(req.body.products))
    credit_session.products = JSON.parse(req.body.products)
    res.json(credit_session)
})


app.get("/credit_products_final", (req, res) => {
    console.log(credit_session)
    let r = db.credit_products(credit_session)
    res.render("confirmed_credit", { placed: r })
})

app.get("/creditor_status", (req, res) => {
    cd = db.get_creditors()
    res.render("creditor_status", { creditor_details: cd })
})

app.post("/update_creditor", (req, res) => {
    console.log(req.body)
    u = db.update_creditor_paid(req.body)
    if (u) {
        res.json({ done: true })
    }
    else {
        res.json({ done: false })
    }
})

app.get("/quick_sell", (req, res) => {
    prod = db.get_products()
    res.render("quick_sell", { products: prod, sold: null })
})

app.post("/quick_sell", (req, res) => {
    console.log(req.body)
    s = db.quick_sell(req.body)
    prod = db.get_products()
    if (s) {
        res.render("quick_sell", { products: prod, sold: true })
    }
    else {
        res.render("quick_sell", { products: prod, sold: false })
    }
})
app.listen(3000, () => {
    console.log("server started on port 3000");
});