

function update_order() {
    let order_id = this.parentElement.parentElement.id
    let order_status = this.parentElement.parentElement.children[4].children[0].children[1].value
    let total_paid = this.parentElement.parentElement.children[6].children[0].value
    $.post("/update_order", { id: order_id, status: order_status, paid: total_paid }, function (data) {
        if (data.done) {
            window.location.href = "/order_status"
        }
    })
}
$(".update-button").each(function (index, ele) {
    ele.onclick = update_order
})