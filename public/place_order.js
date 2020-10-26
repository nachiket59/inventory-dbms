
var selected_sup = $("#selected_sup")
var sup = $("#supplier_table")
console.log($(".select-button"))
$(".select-button").each(function (index, ele) {
    ele.onclick = select_supplier
})

function select_supplier() {
    window.location.href = ("/place_order2/" + this.parentElement.parentElement.id);
}



/*function select_supplier() {
    console.log(this)
    this.innerHTML = "deselect"
    if (selected_sup.find("tr").length < 1) {
        x = this.parentElement.parentElement
        selected_sup.append(x)
        this.onclick = deselect_supplier
    }

}
function deselect_supplier() {
    this.innerHTML = "select"
    sup.append(this.parentElement.parentElement)
    this.onclick = select_supplier
}*/
