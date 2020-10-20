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
    groups = db.get_groups()
    console.log(groups)
    res.render("insert_product", groups)
})
app.post("/insert_product", (req, res) => {
    console.log((req.body))
    s = db.insert_products(req.body)
    console.log(s)
})


app.listen(3000, () => {
    console.log("server started on port 3000");
});