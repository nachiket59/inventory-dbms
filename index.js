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
app.get("/place_order", (req, res) => {
    s = db.get_suppilers()
    res.render("place_order", { suppliers })
})

app.listen(3000, () => {
    console.log("server started on port 3000");
});