const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./database")
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/insert_product", (req, res) => {
    grp = db.get_groups()
    console.log(grp)
    res.render("insert_product", { groups: grp, inserted: null })
})
app.get("/insert_creditorProfile", (req, res) => {
    groups = db.get_groups();
    console.log(groups);
    res.render("insert_creditorProfile", groups);
  });
  app.get("/insert_supplier", (req, res) => {
    groups = db.get_groups();
    console.log(groups);
    res.render("insert_supplier", groups);
  });
  app.get("/insert_retailer", (req, res) => {
    groups = db.get_groups();
    console.log(groups);
    res.render("insert_retailer", groups);
  });
  
  app.get("/insert_productGroup", (req, res) => {
    groups = db.get_groups();
    console.log(groups);
    res.render("insert_productGroup", groups);
  });
app.post("/insert_product", (req, res) => {
    grp = db.get_groups()
    console.log((req.body))
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
    console.log(req.body);
    s = db.insert_creditorProfile(req.body);
    console.log(s);
  });
  
  app.post("/insert_supplier", (req, res) => {
    console.log(req.body);
    s = db.insert_supplier(req.body);
    console.log(s);
  });
  
  app.post("/insert_retailer", (req, res) => {
    console.log(req.body);
    s = db.insert_retailer(req.body);
    console.log(s);
  });

  app.post("/insert_productGroup", (req, res) => {
    console.log(req.body);
    s = db.insert_productGroup(req.body);
    console.log(s);
  });  
app.get("/place_order", (req, res) => {
    s = db.get_suppilers()
    res.render("place_order", { suppliers })
})

app.listen(3000, () => {
    console.log("server started on port 3000");
});