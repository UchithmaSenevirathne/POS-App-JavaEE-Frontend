let OrderPreID="O00-00";
let orderNo=1;

let orderDetails = [];

// cusNames();
// itemNames();
setOrderId();


function cusNames() {
    var optionCus = '';
    for (var i = 0; i < customerDetail.length; i++) {
        optionCus += '<option value="' + customerDetail[i].customerName + '">' + customerDetail[i].customerName + '</option>';
    }
    $('#cmbCusNames').append(optionCus);
    $('filterInputCusName').val($('#cmbCusNames').val);
}

function itemNames() {

    var optionItem = '';
    for (var i = 0; i < itemDetail.length; i++) {
        optionItem += '<option value="' + itemDetail[i].name + '">' + itemDetail[i].name + '</option>';
    }
    $('#cmbItemNames').append(optionItem);
    $('filterInputItemName').val($('#cmbItemNames').val);
}

function setOrderId() {
    $('#InputOID').val(OrderPreID+orderNo);
    console.log(Number(orderNo));
}

$('#filterInputCusName').change(function () {
    for (let i = 0; i < customerDetail.length; i++) {
        if ($(this).val()==customerDetail[i].customerName){
            $('#selectedCusID').val(customerDetail[i].customerID);
            $('#selectedCusName').val(customerDetail[i].customerName);
            break;
        }
    }
});

$('#filterInputItemName').change(function () {
    for (let i = 0; i < itemDetail.length; i++) {
        if ($(this).val()==itemDetail[i].itemName){
            $('#selectedItemCode').val(itemDetail[i].itemID);
            $('#selectedItemName').val(itemDetail[i].itemName);
            $('#selectedItemDes').val(itemDetail[i].itemDescription);
            $('#selectedItemUP').val(itemDetail[i].itemUnitPrice);
            break;
        }
    }
});

$("#btnAddToCart").click(function () {
    addToCart();
});

function addToCart() {

    let item = {
        itemID: $("#selectedItemCode").val(),
        itemName: $("#selectedItemName").val(),
        itemDescription: $("#selectedItemDes").val(),
        unitPrice: $("#selectedItemUP").val(),
        qty: $("#selectedQty").val(),
        total: $("#selectedItemUP").val() * $("#selectedQty").val()
    };
    
    orderDetails.push(item);
    renderCartTable();
    // let subTotal=0;
    // let oItemID = $("#selectedItemCode").val();
    // let oItemName = $("#selectedItemName").val();
    // let oItemDesc = $("#selectedItemDes").val();
    // let oItemUnitPrice = $("#selectedItemUP").val();
    // let oItemQty = $("#selectedQty").val();
    // let oTotal = oItemUnitPrice*oItemQty;

    // let newCart = Object.assign({}, cartOb);
    // newCart.IID = oItemID;
    // newCart.IName = oItemName;
    // newCart.IDescription = oItemDesc;
    // newCart.IUnitPrice = oItemUnitPrice;
    // newCart.IQty = oItemQty;
    // newCart.ITotal = oTotal;

    //add customer record to the customer array
    // orderDetailDb.push(newCart);

    // for (let i = 0; i < itemDetails.length; i++) {
    //     if(itemDetails[i].code==oItemID){
    //         itemDetails[i].qtyOnHand=itemDetails[i].qtyOnHand-oQty;
    //     }
    // }


    //create row and add text field values
    // let row=`<tr>
    //                 <td>${newCart.IID}</td>
    //                 <td>${newCart.IName}</td>
    //                 <td>${newCart.IDescription}</td>
    //                 <td>${newCart.IUnitPrice}</td>
    //                 <td>${newCart.IQty}</td>
    //                 <td>${newCart.ITotal}</td>
    //                </tr>`;
    // //and then append the row to tableBody
    // $("#tBodyPlaceOrder").append(row);

    // clearItemDetails();

    // for (let i = 0; i <= orderDetailDb.length; i++) {
    //     subTotal+=orderDetailDb[i].ITotal;
    //     $('#inputTotal').val(parseInt(subTotal));
    //     console.log(parseInt(subTotal));
    // }

}

function renderCartTable() {
    $("#tBodyPlaceOrder").empty();
    orderDetails.forEach(item => {
        let row = `<tr>
                    <td>${item.itemID}</td>
                    <td>${item.itemName}</td>
                    <td>${item.itemDescription}</td>
                    <td>${item.unitPrice}</td>
                    <td>${item.qty}</td>
                    <td>${item.total}</td>
                    <td><button class="delete-btn bg-danger text-white border rounded" onclick="removeFromCart('${item.itemID}')">Delete</button></td>
                   </tr>`;
        $("#tBodyPlaceOrder").append(row);
    });
}

window.removeFromCart = function(itemID) {
    orderDetails = orderDetails.filter(item => item.itemID !== itemID);
    renderCartTable();
};

$('#inputCash').keydown(function (event){

    if (event.key==='Enter'){
        let balance = Number($('#inputCash').val())-Number($('#inputTotal').val());

        $('#balance').val(balance);
    }

});

$('#btnPurchase').click(function () {
    purchaseOrder();
});

function purchaseOrder() {
    let IdOfOrder = $('#InputOID').val();
    let cusIDOfOrder=$('#selectedCusID').val();
    let cusNameOfOrder=$('#selectedCusName').val();
    let dateOfOrder=$('#InputDate').val();
    let cartDetails=orderDetailDb;
    let subTotal = $('#inputTotal').val();

    let newOrder=Object.assign({},orderOb);
    newOrder.id=IdOfOrder;
    newOrder.customerId=cusIDOfOrder;
    newOrder.customerName=cusNameOfOrder;
    newOrder.date=dateOfOrder;
    newOrder.cartDetail=cartDetails;
    newOrder.total=subTotal;

    orderDb.push(newOrder);


    orderNo++;
    setOrderId();
    console.log(orderNo);

    orderDetailDb=[];
    alert("order Placed Succesfully !");
    console.log(orderDb);
    clearFields();
    getAllOrder();
}

function clearFields() {
    $("#inputCash").val("");
    $("#selectedCusID").val("");
    $("#selectedCusName").val("");
    $("#inputTotal").val("");
    $("#selectedItemCode").val("");
    $("#selectedItemName").val("");
    $("#selectedItemDes").val("");
    $("#tBodyPlaceOrder").empty();
    $("#selectedItemUP").val("");
    $("#selectedQty").val("");
    $("#balance").val("");
    $("#filterInputCusName").val("");
    $("#filterInputItemName").val("");
}

function clearItemDetails() {
    $("#selectedItemCode").val("");
    $("#selectedItemName").val("");
    $("#selectedItemDes").val("");
    $("#selectedItemUP").val("");
    $("#selectedQty").val("");
    $("#filterInputItemName").val("");
}

