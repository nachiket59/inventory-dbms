

function update_order() {
    let creditor_id = this.parentElement.parentElement.id
    //let order_status = this.parentElement.parentElement.children[4].children[0].children[1].value
    let total_paid = this.parentElement.parentElement.children[5].children[0].value
    $.post("/update_creditor", { id: creditor_id, paid: total_paid }, function (data) {
        if (data.done) {
            window.location.href = "/creditor_status"
        }
    })
}
$(".update-button").each(function (index, ele) {
    ele.onclick = update_order
})