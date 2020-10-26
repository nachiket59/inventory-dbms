
function put_order() {
    let checks = $("#supplier_table").find(".check")
    prod_rows = []
    prods = []
    checks.each(function (index, ele) {
        if (ele.checked) {
            prod_id = ele.parentElement.parentElement.id
            prod_name = ele.parentElement.parentElement.children[2].innerHTML
            prod_quant = ele.parentElement.parentElement.children[10].children[0].value
            prod_discount = ele.parentElement.parentElement.children[9].innerHTML
            prod_mrp = ele.parentElement.parentElement.children[8].innerHTML
            prod_sp = ele.parentElement.parentElement.children[7].innerHTML
            prod_cp = ele.parentElement.parentElement.children[6].innerHTML
            prods.push({ id: prod_id, quantity: prod_quant })
            prod_rows.push({ id: prod_id, quantity: prod_quant, name: prod_name, discount: prod_discount, mrp: prod_mrp, sp: prod_sp, cp: prod_cp, total_cost: prod_cp * prod_quant })
        }
    })
    console.log(prod_rows)
    $.post("/place_order3", { products: JSON.stringify(prods) }, function (data) {
        console.log(data)
        $("#title").html("Confirm your order...")
        $("#submit").html("Confirm Order")
        document.getElementById("submit").onclick = confirm_order
        let total_amount = 0
        for (let i = 0; i < prod_rows.length; i++) {
            total_amount += prod_rows[i].total_cost;
        }
        $("#total_products").html("Total number of products:  <mark>" + prod_rows.length + "</mark>")
        $("#total_amount").html("Total purchase amount:  <mark>" + total_amount + " Rs</mark>")
        tableFromJson(prod_rows)
        $("#totals").show()
    })
}
function confirm_order() {
    window.location.href = "/place_order_final";
}
let tableFromJson = (data) => {
    // the json data.
    const myBooks = data

    // Extract value from table header. 
    //         // ('Book ID', 'Book Name', 'Category' and 'Price')
    let col = [];
    for (let i = 0; i < myBooks.length; i++) {
        for (let key in myBooks[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // Create a table.
    const table = document.createElement("table");
    table.classList.add("table")
    table.classList.add("table-bordered")
    // Create table header row using the extracted headers above.
    let tr = table.insertRow(-1);                   // table row.

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");       //table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    //         // add json data to the table as rows.
    for (let i = 0; i < myBooks.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // Now, add the newly created table with json data, to a container.
    const divShowData = document.getElementById('tableview');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
}
document.getElementById("submit").onclick = put_order
$("#totals").hide()