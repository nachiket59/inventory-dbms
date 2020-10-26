var selected_sup = $("#selected_sup")
var sup = $("#creditor-table")
console.log($(".select-button"))
$(".select-button").each(function (index, ele) {
    ele.onclick = select_supplier
})

function select_supplier() {
    window.location.href = ("/credit_products2/" + this.parentElement.parentElement.id);
}