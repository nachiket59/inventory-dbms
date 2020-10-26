const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./database")
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

var order_session = null
var credit_session = null
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/insert_product", (req, res) => {
    grp = db.get_groups()
    console.log(grp)
    res.render("insert_product", { groups: grp, inserted: null })
})
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