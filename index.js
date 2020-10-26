const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./database")
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
const  moment = require("moment");
app.locals.moment = moment;
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req, res) => {
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
  prods = db.get_products()
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
  
    res.render("view_transactions", {transaction: null} );
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

      prods = db.get_products();
  res.render("view_product",{product: prods,del:null,update:true});
    
    }
    else {
      prods = db.get_products();
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
app.get("/place_order", (req, res) => {
    s = db.get_suppilers()
    res.render("place_order", { suppliers })
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
    prods = db.get_products();
  res.render("view_product",{product: prods,del:true , update:null});
}
else{
  prods = db.get_products();
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
   prods= db.get_product_by_id(req.query)
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

app.listen(3000, () => {
    console.log("server started on port 3000");
});